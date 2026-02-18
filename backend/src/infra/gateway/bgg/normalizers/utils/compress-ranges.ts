import { PlayerRange } from "../../types/bgg-poll";

export function compressRanges(values: number[]): PlayerRange[] {
  if (values.length === 0) return [];

  values.sort((a, b) => a - b);

  const ranges: PlayerRange[] = [];
  let min = values[0];
  let max = values[0];

  for (let i = 1; i < values.length; i++) {
    const current = values[i];

    if (current === max + 1) {
      max = current;
    } else {
      ranges.push({ min, max });
      min = current;
      max = current;
    }
  }

  ranges.push({ min, max });

  return ranges;
}