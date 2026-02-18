import { Poll } from "../../types/bgg-poll";

type LanguageDependenceResult = {
  level: number;
  value: string;
  numvotes: number;
};

export function normalizeLanguageDependence(
  poll?: Poll
): { level: number; description: string } | null {
  if (!poll?.results?.result) return null;

  const results: LanguageDependenceResult[] = poll.results.result;

  let best: LanguageDependenceResult | null = null;
  let maxVotes = -1;

  for (const r of results) {
    if (r.numvotes > maxVotes) {
      maxVotes = r.numvotes;
      best = r;
    }
  }

  if (!best) return null;

  return {
    level: best.level,
    description: best.value,
  };
}
