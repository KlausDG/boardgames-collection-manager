export default interface BggClient {
  get({ query, type }: { query: string; type: Array<string> }): Promise<any>;
  getById(id: number): Promise<any>;
  filterDesignersElements(data: Array<{ type: string; value: string }>): Array<string>;
  filterPublishersElements(data: Array<{ type: string; value: string }>): Array<string>;
  filterMechanicsElements(data: Array<{ type: string; value: string }>): Array<string>;
  findBaseGames(data: Array<{ id: number; type: string; value: string; inbound?: boolean }>): Array<{
    value: string;
    id: number;
  }>;
}
