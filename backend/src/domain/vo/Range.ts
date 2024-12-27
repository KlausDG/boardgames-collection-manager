export default class Range {
  private range: { min: number; max: number };

  constructor(min: number, max: number) {
    this.range = {
      min,
      max,
    };
  }

  getRange() {
    return this.range;
  }

  getMin() {
    return this.range.min;
  }

  getMax() {
    return this.range.max;
  }
}
