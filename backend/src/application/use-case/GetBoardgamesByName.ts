import { BggGateway } from "../../infra/gateway/BggGateway";

export default class GetBoardgamesByName {
  constructor(readonly bggGateway: BggGateway) {}

  async execute(input: string) {
    if (!input || input.trim() === "") {
      throw new Error("Input cannot be empty");
    }
    return this.bggGateway.getBoardgamesByName(input);
  }
}
