export default interface BggClient {
  get({ query, type }: {query: string, type: Array<string>}): Promise<any>;
  getById(id: number): Promise<any>
}