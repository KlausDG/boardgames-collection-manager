import { BggApiPort } from "@/application/ports/BggApiPort";
import { BggXmlApiClient, SearchType } from "bgg-xml-api-client";

export class BggHttpAdapter implements BggApiPort {
  constructor(private client: BggXmlApiClient) {}

  search(params: { query: string; type: SearchType[] }) {
    return this.client.getBggSearch(params);
  }

  getBoardgameFromBgg(id: string) {
    return this.client.getBggThing({ id });
  }
}