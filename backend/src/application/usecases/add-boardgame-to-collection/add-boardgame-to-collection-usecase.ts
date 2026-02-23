import { BoardgameRepository } from "@/application/ports/BoardgameRepository";
import { Boardgame } from "@/domain/entities/Boardgame";

export class AddBoardgameToCollectionUseCase {
  constructor(private boardgameRepository: BoardgameRepository) {}

  async execute(boardgame: Boardgame): Promise<any> {
    // return await this.boardgameRepository.save(boardgame);
    return boardgame;
  }
}
