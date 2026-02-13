import { BggApiPort } from "@/application/ports/BggApiPort";
import { BggXmlApiClient, SearchType } from "bgg-xml-api-client";
import { normalizeBggSearchResponse } from "./normalizeBggSearchResponse";

export class BggHttpAdapter implements BggApiPort {
  constructor(private client: BggXmlApiClient) {}

  search(params: { query: string; type: SearchType[] }) {
    return this.client.getBggSearch(params);
  }

  getBoardgameFromBgg(id: string) {
    return this.client.getBggThing({ id });
  }

  async searchBoardgamesByName(name: string) {
    const raw = await this.client.getBggSearch({
      query: name,
      type: ["boardgame"],
    });

    const normalized = normalizeBggSearchResponse(raw);

    return {
      items: normalized.items.map((item) => ({
        bggId: Number(item.id),
        name: item.name.value,
        yearPublished: item.yearpublished?.value
          ? Number(item.yearpublished.value)
          : undefined,
      })),
      total: normalized.total,
    };
  }
}
