import { BggApiPort } from "@/application/ports/BggApiPort";
import { BoardgameDTO } from "./GetBoardgameFromBggDTO";

export class GetBoardgameFromBggUseCase {
  constructor(private bggClient: BggApiPort) {}

  async execute(name: string): Promise<BoardgameDTO> {
    // 1️⃣ Pega os dados do boardgame via BGG API
    const raw = await this.bggClient.getBoardgameFromBgg(name);
    const item = Array.isArray(raw.item) ? raw.item[0] : raw.item;
    const game = item as any;    

    // 2️⃣ Mapeia os dados para um DTO (JSON-friendly)
    // const designers = this.bggClient.filterDesignersElements(raw.items);
    // const mechanics = this.bggClient.filterMechanicsElements(raw.items);
    // const publishers = this.bggClient.filterPublishersElements(raw.items);
    // const expansions = this.bggClient.findBaseGames(raw.items);

    return {
      bggId: game.id,
      name: game.name,
      yearPublished: game.yearPublished,
      description: game.description,
      thumbnail: game.thumbnail,
      minPlayers: game.minPlayers,
      maxPlayers: game.maxPlayers,
      bestPlayerCount: game.bestPlayerCount,
      weight: game.weight,
      bggRank: game.rank,
      bggLink: game.link,
      designers: [],
      mechanics: [],
      publishers: [],
      expansions: [],
    };
  }
}
