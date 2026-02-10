import { BggScrapedGameDTO } from "@/application/dto/BggScrapedGameDTO";

export function parseBggGamePage(url: string): BggScrapedGameDTO {
  const bestPlayersEl = document.querySelector(
    ".gameplay-item-secondary .ng-binding:last-child"
  ) as HTMLElement | null;

  const weightEl = document.querySelector("[class*=gameplay-weight]") as HTMLElement | null;
  const rankEl = document.querySelector(".rank-number a") as HTMLElement | null;

  const bestPlayersText = bestPlayersEl?.innerText ?? "";

  return {
    bestPlayersCount: bestPlayersText.includes("none")
      ? []
      : bestPlayersText
          .replace("— Best: ", "")
          .split("–")
          .map((n) => Number(n)),
    weight: weightEl ? Number(weightEl.innerText) : null,
    rank: rankEl ? Number(rankEl.innerText.replace(",", "")) : null,
    link: url,
  };
}
