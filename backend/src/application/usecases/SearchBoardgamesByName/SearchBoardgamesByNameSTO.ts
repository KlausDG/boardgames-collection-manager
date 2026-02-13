export type SearchBoardgamesByNameDTO = {
  items: Array<{
    bggId: number;
    name: string;
    yearPublished?: number;
  }>;
  total: number;
};
