import { BggApiPort } from "@/application/ports/BggApiPort";
import { BoardgameDTO } from "./GetBoardgameFromBggDTO";


export class GetBoardgameFromBggUseCase {
  constructor(private bggClient: BggApiPort) {}

  async execute(name: string): Promise<BoardgameDTO> {
    // 1️⃣ Pega os dados do boardgame via BGG API
    const raw = await this.bggClient.getBoardgameFromBgg(name);

    // 2️⃣ Mapeia os dados para um DTO (JSON-friendly)
    const designers = this.bggClient.filterDesignersElements(raw.items);
    const mechanics = this.bggClient.filterMechanicsElements(raw.items);
    const publishers = this.bggClient.filterPublishersElements(raw.items);
    const expansions = this.bggClient.findBaseGames(raw.items);

    return {
      bggId: raw.id,
      name: raw.name,
      yearPublished: raw.yearPublished,
      description: raw.description,
      thumbnail: raw.thumbnail,
      minPlayers: raw.minPlayers,
      maxPlayers: raw.maxPlayers,
      bestPlayerCount: raw.bestPlayerCount,
      weight: raw.weight,
      bggRank: raw.rank,
      bggLink: raw.link,
      designers,
      mechanics,
      publishers,
      expansions,
    };
  }
}
