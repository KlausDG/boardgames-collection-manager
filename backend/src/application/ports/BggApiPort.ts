import { BggSearchResponse, BggThingResponse, SearchType } from "bgg-xml-api-client";
import { SearchBoardgamesByNameDTO } from "../usecases/SearchBoardgamesByName/SearchBoardgamesByNameSTO";

export type TypeValue = {
  type: string;
  value: string;
  id?: number;
  inbound?: boolean;
};

export interface BggApiPort {
  search(params: { query: string; type: SearchType[] }): Promise<any>;
  getBoardgameFromBgg(id: string): Promise<BggThingResponse>;
  searchBoardgamesByName(name: string): Promise<SearchBoardgamesByNameDTO>;
  // filterDesignersElements(data: TypeValue[]): string[];
  // filterPublishersElements(data: TypeValue[]): string[];
  // filterMechanicsElements(data: TypeValue[]): string[];

  // findBaseGames(data: TypeValue[]):;
}
