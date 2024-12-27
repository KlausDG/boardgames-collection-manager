type Playtime = {
  min: number;
  max: number;
};

export default class PlaytimeRange {
  playtime: Playtime;
  constructor(min: number, max: number) {
    this.playtime = {
      min,
      max,
    };
  }

  getRange() {
    return this.playtime;
  }

  getMin() {
    return this.playtime.min;
  }

  getMax() {
    return this.playtime.max;
  }
}
