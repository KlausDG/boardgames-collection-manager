import { BggScrapedGameDTO } from "@/application/dto/BggScrapedGameDTO";

export function parseBggGamePage(url: string): BggScrapedGameDTO {
  const weightEl = document.querySelector("[class*=gameplay-weight]") as HTMLElement | null;
  const rankEl = document.querySelector(".rank-value") as HTMLElement | null;

  return {
    weight: weightEl ? Number(weightEl.innerText) : null,
    rank: rankEl ? Number(rankEl.innerText.replace(",", "")) : null,
    link: url,
  };
}
