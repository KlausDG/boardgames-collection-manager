
type NormalizedBggLinks = {
  mechanics: string[];
  categories: string[];
  designers: string[];
  publishers: string[];
  expansions: string[];
};

const typeMap: Record<string, keyof NormalizedBggLinks> = {
  boardgamemechanic: "mechanics",
  boardgamecategory: "categories",
  boardgamedesigner: "designers",
  boardgamepublisher: "publishers",
  boardgameexpansion: "expansions",
};

export function normalizeBggLinks(data: any) {
  const result: NormalizedBggLinks = {
    mechanics: [],
    categories: [],
    designers: [],
    publishers: [],
    expansions: [],
  };

  for (const item of data) {
    const key = typeMap[item.type];
    if (!key) continue;

    result[key].push(item.value);
  }

  return result;
}
