import PlayersRange from "../vo/PlayersRange";
import PlaytimeRange from "../vo/PlaytimeRange";
import URL from "../vo/URL";

export default class BggBoardgame {
  thumbnail: URL;
  players: PlayersRange;
  playtime: PlaytimeRange;

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
    readonly isExpansionFor: Array<{ id: number; value: string }>
  ) {
    this.thumbnail = new URL(thumbnail);
    this.players = new PlayersRange(minPlayers, maxPlayers);
    this.playtime = new PlaytimeRange(minPlaytime, maxPlaytime);
  }
}
