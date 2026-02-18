import { Poll } from "../../types/bgg-poll";

export function getPoll(polls: Poll[], pollName: string): Poll | undefined {
  return polls.find((p) => p.name === pollName);
}