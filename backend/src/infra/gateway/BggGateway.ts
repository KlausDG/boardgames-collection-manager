import BggBoardgame from "../../domain/entity/BggBoardgame";
import { HttpError } from "../../shared/errors/HttpError";
import BggClient from "../adapter/BggClient";

export interface BggGateway {
  getBoardgamesByName(input: string): Promise<any>;
  getBoardgameByBggId(input: number): Promise<BggBoardgame>;
}

export default class BggHttpGateway implements BggGateway {
  constructor(readonly bggClient: BggClient) {}

  async getBoardgamesByName(input: string) {
    const bggData = await this.bggClient.get({ query: input, type: ["boardgame"] });

    if (!bggData.total) {
      throw new HttpError(404, "Not found");
    }

    return bggData.item.map((item: any) => {
      const yearPublishedSection = item.yearpublished?.value ? `(${item.yearpublished.value})` : "";
      return {
        id: item.id,
        name: `${item.name.value} ${yearPublishedSection}`,
      };
    });
  }

  async getBoardgameByBggId(input: number) {
    const bggData = await this.bggClient.getById(input);

    const boardgame = bggData.item;

    const { link } = boardgame;

    const designers = this.bggClient.filterDesignersElements(link);
    const publishers = this.bggClient.filterPublishersElements(link);
    const mechanics = this.bggClient.filterMechanicsElements(link);
    const isExpansionFor = this.bggClient.findBaseGames(link);

    return new BggBoardgame(
      boardgame.thumbnail,
      Array.isArray(boardgame.name) ? boardgame.name[0].value : boardgame.name.value,
      boardgame.description,
      boardgame.yearpublished.value,
      boardgame.minplayers.value,
      boardgame.maxplayers.value,
      boardgame.minplaytime.value,
      boardgame.maxplaytime.value,
      designers,
      publishers,
      mechanics,
      !!isExpansionFor.length,
      isExpansionFor
    );
  }
}
