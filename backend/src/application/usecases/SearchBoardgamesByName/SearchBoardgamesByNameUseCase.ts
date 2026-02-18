import { BggApiPort } from "@/application/ports/BggApiPort";
import { SearchBoardgamesByNameDTO } from "./SearchBoardgamesByNameDTO";

export class SearchBoardgamesByNameUseCase {
  constructor(private bggClient: BggApiPort) {}

  async execute(name: string): Promise<SearchBoardgamesByNameDTO> {
    return await this.bggClient.searchBoardgamesByName(name);
  }
}
