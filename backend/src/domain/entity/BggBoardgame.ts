import Range from "../vo/Range";
import URL from "../vo/URL";

export default class BggBoardgame {
  thumbnail: URL;
  players: Range;
  playtime: Range;
  link: URL;

  constructor(
    thumbnail: string,
    readonly name: string,
    readonly description: string,
    readonly yearPublished: number,
    minPlayers: number,
    maxPlayers: number,
    minPlaytime: number,
    maxPlaytime: number,
    readonly designers: Array<string>,
    readonly publishers: Array<string>,
    readonly mechanics: Array<string>,
    readonly isExpansion: boolean,
    readonly isExpansionFor: Array<{ id: number; value: string }>,
    readonly bestPlayersCount: Array<number>,
    readonly weight: number | null,
    readonly rank: number | null,
    link: string
  ) {
    this.thumbnail = new URL(thumbnail);
    this.players = new Range(minPlayers, maxPlayers);
    this.playtime = new Range(minPlaytime, maxPlaytime);
    this.link = new URL(link);
  }
}
