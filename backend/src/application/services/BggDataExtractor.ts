type TypeValue = {
  type: string;
  value: string;
};

export class BggDataExtractor {
  private static filterByTag(tag: string, data: TypeValue[]): string[] {
    return data
      .filter((item) => item.type === tag)
      .map((item) => item.value);
  }

  static extractDesigners(data: TypeValue[]) {
    return this.filterByTag("boardgamedesigner", data);
  }

  static extractPublishers(data: TypeValue[]) {
    return this.filterByTag("boardgamepublisher", data);
  }

  static extractMechanics(data: TypeValue[]) {
    return this.filterByTag("boardgamemechanic", data);
  }

  static extractBaseGames(
    data: Array<{ id: number; type: string; value: string; inbound?: boolean }>
  ) {
    return data
      .filter((item) => item.type === "boardgameexpansion" && item.inbound)
      .map((item) => ({
        id: item.id,
        name: item.value,
      }));
  }
}
