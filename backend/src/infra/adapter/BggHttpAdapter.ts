import { getBggSearch, getBggThing, SearchType } from "bgg-xml-api-client";
import BggClient from "./BggClient";

type TypeValue = {
  type: string;
  value: string;
};

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

  private filterElementsByTagName = (tag: string) => (data: Array<TypeValue>) => {
    const dataToFilter = Array.isArray(data) ? data : [data];

    return dataToFilter.reduce((acc, item) => {
      if (item.type === tag) {
        acc.push(item.value);
      }
      return acc;
    }, [] as Array<string>);
  };

  filterDesignersElements(data: Array<TypeValue>) {
    return this.filterElementsByTagName("boardgamedesigner")(data);
  }

  filterPublishersElements(data: Array<TypeValue>) {
    return this.filterElementsByTagName("boardgamepublisher")(data);
  }

  filterMechanicsElements(data: Array<TypeValue>) {
    return this.filterElementsByTagName("boardgamemechanic")(data);
  }

  findBaseGames(data: Array<{ id: number; type: string; value: string; inbound?: boolean }>) {
    const formattedData = Array.isArray(data) ? data : [data];

    return formattedData.reduce((acc, item) => {
      if (item.type === "boardgameexpansion" && item.inbound) {
        acc.push({ value: item.value, id: item.id });
      }
      return acc;
    }, [] as Array<{ value: string; id: number }>);
  }
}
