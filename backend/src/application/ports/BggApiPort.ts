import { BggThingResponse, SearchType } from "bgg-xml-api-client";

export type TypeValue = {
  type: string;
  value: string;
  id?: number;
  inbound?: boolean;
};

export interface BggApiPort {
  search(params: { query: string; type: SearchType[] }): Promise<any>;
  getBoardgameFromBgg(id: string): Promise<BggThingResponse>;
  // filterDesignersElements(data: TypeValue[]): string[];
  // filterPublishersElements(data: TypeValue[]): string[];
  // filterMechanicsElements(data: TypeValue[]): string[];

  // findBaseGames(data: TypeValue[]):;
}
