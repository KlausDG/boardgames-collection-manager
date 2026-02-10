export interface ImportBoardgameInput {
  bggId: number;
  ownedExpansionIds?: number[];
}

export interface ImportBoardgameOutput {
  id: number;
  name: string;
  bggId: number;
}
