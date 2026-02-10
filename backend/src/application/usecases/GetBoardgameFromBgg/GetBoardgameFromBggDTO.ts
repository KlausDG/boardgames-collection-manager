export type BoardgameDTO = {
  bggId: number;
  name: string;
  yearPublished?: number;
  description?: string;
  thumbnail?: string;
  minPlayers?: number;
  maxPlayers?: number;
  bestPlayerCount?: number[];
  weight?: number;
  bggRank?: number;
  bggLink?: string;
  designers?: string[];
  mechanics?: string[];
  publishers?: string[];
  expansions?: { bggId: number; name: string }[];
};
