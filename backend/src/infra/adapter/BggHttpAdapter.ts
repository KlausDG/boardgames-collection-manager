import { getBggSearch, getBggThing, SearchType } from "bgg-xml-api-client";
import BggClient from "./BggClient";

export default class BggHttpAdapter implements BggClient {
  async get({ query, type }: { query: string; type: Array<SearchType> }) {
    return getBggSearch({
      query,
      type,
    });
  }

  async getById(id: number) {
    return getBggThing({ id });
  }
}
