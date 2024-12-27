import BggGateway from "../../infra/gateway/BggGateway";

export default class GetBoardgameDetails {
  constructor(readonly bggGateway: BggGateway) {}

  async execute(input: number): Promise<Output> {
    const boardgameData = await this.bggGateway.getBoardgameByBggId(input);

    return {
      bggId: input,
      name: boardgameData.name,
      thumbnail: boardgameData.thumbnail.getValue(),
      description: boardgameData.description,
      yearPublished: boardgameData.yearPublished,
      players: boardgameData.players.getRange(),
      playtime: boardgameData.playtime.getRange(),
      designers: boardgameData.designers,
      publishers: boardgameData.publishers,
      mechanics: boardgameData.mechanics,
      isExpansion: boardgameData.isExpansion,
      isExpansionFor: boardgameData.isExpansionFor,
    };
  }
}

type Output = {
  bggId: number;
  name: string;
  thumbnail: string;
  description: string;
  yearPublished: number;
  players: Range;
  playtime: Range;
  designers: Array<string>;
  publishers: Array<string>;
  mechanics: Array<string>;
  isExpansion: boolean;
  isExpansionFor: Array<{ id: number; value: string }>;
};

type Range = {
  min: number;
  max: number;
};
