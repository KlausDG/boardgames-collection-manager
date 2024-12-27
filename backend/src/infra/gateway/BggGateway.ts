import { HttpError } from "../../shared/errors/HttpError";
import BggClient from "../adapter/BggClient";

export interface BggGateway {
  getBoardgamesByName(input: string): Promise<any>;
}

export default class BggHttpGateway implements BggGateway {
  constructor(readonly bggClient: BggClient) {}

  async getBoardgamesByName(input: string) {
    const bggData = await this.bggClient.get({ query: input, type: ["boardgame"] });

    if (!bggData.total) {
      throw new HttpError(404, "Not found");
    }

    return bggData.item.map((item: any) => {
      return {
        id: item.id,
        name: `${item.name.value} ${item?.yearpublished?.value || ""}`,
      };
    });
  }
}
