import BggClient from "../adapter/BggClient";

export interface BggGateway {
  getBoardgamesByName(input: string): Promise<any>
}

export default class BggHttpGateway implements BggGateway {
  constructor(readonly bggClient: BggClient) {}

  async getBoardgamesByName(input: string) {    
    return this.bggClient.get({ query: input, type: ["boardgame"]})
  }
}