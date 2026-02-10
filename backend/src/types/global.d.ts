// src/types/global.d.ts
import { BggScrapedGameDTO } from "@/application/dto/BggScrapedGameDTO";

declare global {
  interface Window {
    __BGG_PARSER__: (url: string) => BggScrapedGameDTO;
  }
}

export {};
