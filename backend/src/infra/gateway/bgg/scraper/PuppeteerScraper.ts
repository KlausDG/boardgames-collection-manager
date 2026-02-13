import puppeteer, { Page } from "puppeteer";
import { BggScraperPort } from "@/application/ports/BggScraperPort";
import { BggScrapedGameDTO } from "@/application/dto/BggScrapedGameDTO";
import { parseBggGamePage } from "./BggPageParser";

export class PuppeteerScraper implements BggScraperPort {
  async scrapeGamePage(url: string): Promise<BggScrapedGameDTO> {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await this.optimizeRequests(page);
      await page.addScriptTag({
        content: `
          window.__BGG_PARSER__ = ${parseBggGamePage.toString()}
        `,
      });
      await page.goto(url, { waitUntil: "domcontentloaded" });

      return await page.evaluate((url) => {
        // Parser roda NO CONTEXTO DO BROWSER
        return (window as any).__BGG_PARSER__(url);
      }, url);
    } finally {
      await browser.close();
    }
  }

  private async optimizeRequests(page: Page) {
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (request.isInterceptResolutionHandled()) return;

      const blocked = [".png", ".jpg", ".jpeg", ".css"];
      blocked.some((ext) => request.url().endsWith(ext))
        ? request.abort()
        : request.continue();
    });
  }
}
