import { BggApiPort } from "@/application/ports/BggApiPort";
import { BoardgameDTO } from "./GetBoardgameFromBggDTO";

export class GetBoardgameFromBggUseCase {
  constructor(private bggClient: BggApiPort) {}

  async execute(id: string): Promise<BoardgameDTO> {
    return await this.bggClient.getBoardgameFromBgg(id);
  }
}
