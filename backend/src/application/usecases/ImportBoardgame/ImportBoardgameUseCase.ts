import { BggApiPort } from "@/application/ports/BggApiPort";
import { BggScraperPort } from "@/application/ports/BggScraperPort";
import { BoardgameRepository } from "@/application/ports/BoardgameRepository";
import { ImportBoardgameInput, ImportBoardgameOutput } from "./ImportBoardgameDTO";
import { Boardgame } from "@/domain/entities/Boardgame";

export class ImportBoardgameUseCase {
  constructor(
    private readonly bggClient: BggApiPort,
    private readonly scraper: BggScraperPort,
    private readonly boardgameRepository: BoardgameRepository
  ) {}

  async execute(input: ImportBoardgameInput): Promise<ImportBoardgameOutput> {
    const { bggId, ownedExpansionIds = [] } = input;

    const alreadyExists = await this.boardgameRepository.existsByBggId(bggId);
    if (alreadyExists) {
      throw new Error("Boardgame already imported");
    }

    // 1️⃣ Busca dados do BGG (XML API → JSON)
    const bggData = await this.bggClient.getById(bggId);

    const game = bggData.items.item;

    // 2️⃣ Scraping complementar
    const scraped = await this.scraper.scrape(game.link);

    // 3️⃣ Cria entidade de domínio
    const boardgame = Boardgame.create({
      name: game.name.value,
      bggId: game.id,
      yearPublished: game.yearpublished?.value,
      description: game.description,
      minPlayers: game.minplayers?.value,
      maxPlayers: game.maxplayers?.value,
      bestPlayerCount: scraped.bestPlayersCount,
      weight: scraped.weight,
      bggRank: scraped.rank,
      bggLink: scraped.link,
      designers: game.link
        .filter((l: any) => l.type === "boardgamedesigner")
        .map((d: any) => d.value),
      publishers: game.link
        .filter((l: any) => l.type === "boardgamepublisher")
        .map((p: any) => p.value),
      mechanics: game.link
        .filter((l: any) => l.type === "boardgamemechanic")
        .map((m: any) => m.value),
      expansions: game.link
        .filter((l: any) => l.type === "boardgameexpansion")
        .map((e: any) => ({
          name: e.value,
          bggId: e.id,
          owned: ownedExpansionIds.includes(e.id),
        })),
    });

    // 4️⃣ Persistência
    const saved = await this.boardgameRepository.save(boardgame);

    return {
      id: saved.id,
      name: saved.name,
      bggId: saved.bggId,
    };
  }
}
