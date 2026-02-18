import { Poll, PlayerRange } from "../../types/bgg-poll";
import { compressRanges } from "../utils/compress-ranges";

type SuggestedNumPlayersEntry = {
  numplayers: number | string; // 1,2,3,4,"4+"
  result: { value: "Best" | "Recommended" | "Not Recommended"; numvotes: number }[];
};

export function normalizeSuggestedNumPlayersBestRanges(
  poll?: Poll
): PlayerRange[] {
  if (!poll?.results) return [];

  const entries: SuggestedNumPlayersEntry[] = poll.results;

  const best: number[] = [];

  for (const entry of entries) {
    if (typeof entry.numplayers !== "number") continue;

    let winner: string | null = null;
    let maxVotes = -1;

    for (const r of entry.result) {
      if (r.numvotes > maxVotes) {
        maxVotes = r.numvotes;
        winner = r.value;
      }
    }

    if (winner === "Best") {
      best.push(entry.numplayers);
    }
  }

  return compressRanges(best);
}