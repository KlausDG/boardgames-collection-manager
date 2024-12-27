import { BggGateway } from "../../infra/gateway/BggGateway";

export default class GetBoardgamesByName {
  constructor(readonly bggGateway: BggGateway) {}

  async execute(input: string) {
    return this.bggGateway.getBoardgamesByName(input);
  }
}
