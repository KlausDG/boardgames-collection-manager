import { BggScraperPort } from "@/application/ports/BggScraperPort";

export class FetchAdditionalBoardgameDataUseCase {
  constructor(private scrapperClient: BggScraperPort) {}

  async execute(id: string): Promise<any> {
    return await this.scrapperClient.scrapeGamePage(id);
  }
}
