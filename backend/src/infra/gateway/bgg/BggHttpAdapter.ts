import { BggApiPort } from "@/application/ports/BggApiPort";
import { BggXmlApiClient } from "bgg-xml-api-client";
import { mapBggThingToBoardgame } from "./mappers/map-bgg-thing-to-boardgame";
import { mapBggSearchByName } from "./mappers/map-bgg-search-by-name";

export class BggHttpAdapter implements BggApiPort {
  constructor(private client: BggXmlApiClient) {}

  async getBoardgameFromBgg(id: string) {
    const raw = await this.client.getBggThing({ id });
    return mapBggThingToBoardgame(raw);
  }

  async searchBoardgamesByName(name: string) {
    const raw = await this.client.getBggSearch({
      query: name,
      type: ["boardgame"],
    });

    return mapBggSearchByName(raw);
  }
}
