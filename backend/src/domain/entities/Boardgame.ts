export type ExpansionReference = {
  name: string;
  bggId: number;
  owned: boolean;
};

export interface BoardgameProps {
  name: string;
  bggId: number;
  yearPublished?: number;
  description?: string;
  minPlayers?: number;
  maxPlayers?: number;
  bestPlayerCount?: number[];
  weight?: number;
  bggRank?: number;
  bggLink?: string;
  designers: string[];
  publishers: string[];
  mechanics: string[];
  expansions: ExpansionReference[];
}

export class Boardgame {
  public readonly id?: number;
  public readonly props: BoardgameProps;

  private constructor(props: BoardgameProps, id?: number) {
    this.props = props;
    this.id = id;
  }

  static create(props: BoardgameProps, id?: number) {
    return new Boardgame(props, id);
  }

  static fromPersistence(p: any): Boardgame {
    return new Boardgame(
      {
        name: p.name,
        bggId: p.bggId,
        yearPublished: p.yearPublished,
        description: p.description,
        minPlayers: p.minPlayers,
        maxPlayers: p.maxPlayers,
        bestPlayerCount: p.bestPlayerCount,
        weight: p.weight,
        bggRank: p.bggRank,
        bggLink: p.bggLink,
        designers: p.designers.map((d: any) => d.name),
        publishers: [p.publisher.name],
        mechanics: p.mechanics.map((m: any) => m.name),
        expansions: p.expansions.map((e: any) => ({
          name: e.name,
          bggId: e.bggId,
          owned: e.owned,
        })),
      },
      p.id
    );
  }

  get name() {
    return this.props.name;
  }

  get bggId() {
    return this.props.bggId;
  }
}
