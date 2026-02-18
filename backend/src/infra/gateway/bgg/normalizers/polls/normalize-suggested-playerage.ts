import { Poll } from "../../types/bgg-poll";

type SuggestedPlayerAgeResult = {
  value: number | string; // pode ser "21 and up"
  numvotes: number;
};

export function normalizeSuggestedPlayerAge(poll?: Poll): number | string | null {
  if (!poll?.results?.result) return null;

  const results: SuggestedPlayerAgeResult[] = poll.results.result;

  let best: number | string | null = null;
  let maxVotes = -1;

  for (const r of results) {
    if (r.numvotes > maxVotes) {
      maxVotes = r.numvotes;
      best = r.value;
    }
  }

  return best;
}
