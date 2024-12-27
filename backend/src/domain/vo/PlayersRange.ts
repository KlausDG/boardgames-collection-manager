type Players = {
  min: number;
  max: number;
};

export default class PlayersRange {
  players: Players;
  constructor(min: number, max: number) {
    this.players = {
      min,
      max,
    };
  }

  getRange() {
    return this.players;
  }

  getMin() {
    return this.players.min;
  }

  getMax() {
    return this.players.max;
  }
}
