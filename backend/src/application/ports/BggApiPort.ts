import { SearchBoardgamesByNameDTO } from "../usecases/SearchBoardgamesByName/SearchBoardgamesByNameDTO";
import { BoardgameDTO } from "../usecases/GetBoardgameFromBgg/GetBoardgameFromBggDTO";


export interface BggApiPort {
  getBoardgameFromBgg(id: string): Promise<BoardgameDTO>;
  searchBoardgamesByName(name: string): Promise<SearchBoardgamesByNameDTO>;
}
