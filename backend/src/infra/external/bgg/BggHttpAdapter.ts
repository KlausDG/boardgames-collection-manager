import { getBggSearch, getBggThing, SearchType } from "bgg-xml-api-client";
import { BggApiPort } from "@/application/ports/BggApiPort";

export class BggHttpAdapter implements BggApiPort {
  async search({ query, type }: { query: string; type: SearchType[] }) {
    return getBggSearch({ query, type }); //Add token
  }

  async getBoardgameFromBgg(name: string) {
    return getBggThing({ name }); //Add token
  }
}
