import { PlayerRange } from "@/infra/gateway/bgg/types/bgg-poll";

export type BoardgameDTO = {
  bggId: number;
  name: string;
  yearPublished: number;
  description: string;
  thumbnail: string;
  image: string;
  minPlayers: number;
  maxPlayers: number;
  bestPlayerCount: PlayerRange[];
  weight?: number;
  bggRank?: number;
  bggLink?: string;
  playingTime: number;
  minPlaytime: number;
  maxPlaytime: number;
  minAge: number;
  suggestedPlayerAge: string | number | null;
  languageDependence: {
    level: number;
    description: string;
  } | null;
  designers: string[];
  mechanics: string[];
  categories: string[];
  publishers: string[];
  expansions: string[];
};
