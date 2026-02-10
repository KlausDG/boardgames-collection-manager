import { BggScrapedGameDTO } from "../dto/BggScrapedGameDTO";

export interface BggScraperPort {
  scrapeGamePage(url: string): Promise<BggScrapedGameDTO>;
}
