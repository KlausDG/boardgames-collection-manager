import puppeteer from "puppeteer";
import { ScrapperAdapter } from "./Scrapper";

export default class PuppeteerAdapter implements ScrapperAdapter {
  async scrape(url: string) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.setRequestInterception(true);
      page.on("request", (interceptedRequest) => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;
        if (
          interceptedRequest.url().endsWith(".png") ||
          interceptedRequest.url().endsWith(".jpg") ||
          interceptedRequest.url().endsWith(".css")
        )
          interceptedRequest.abort();
        else interceptedRequest.continue();
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });

      const data = await page.evaluate((url: string) => {
        const bestPlayersCountContainer = document.querySelector(
          ".gameplay-item-secondary .ng-binding:last-child"
        ) as HTMLElement;
        const bestPlayersCount = bestPlayersCountContainer ? bestPlayersCountContainer.innerText : "";
        const gameWeightContainer = document.querySelector("[class*=gameplay-weight]") as HTMLElement;
        const gameWeight = gameWeightContainer ? gameWeightContainer.innerText : null;
        const gameRankContainer = document.querySelector(".rank-number a") as HTMLElement;
        const gameRank = gameRankContainer ? gameRankContainer.innerText : null;

        return {
          bestPlayersCount: !bestPlayersCount.includes("none")
            ? bestPlayersCount
                .replace("— Best: ", "")
                .split("–")
                .map((item) => parseInt(item))
            : [],
          weight: Number(gameWeight),
          rank: gameRank ? parseInt(gameRank.replace(",", "")) : null,
          link: url,
        };
      }, url);
      return data;
    } catch (error) {
      console.error("Erro ao realizar o scraping:", error);
      throw error;
    } finally {
      await browser.close();
    }
  }
}
