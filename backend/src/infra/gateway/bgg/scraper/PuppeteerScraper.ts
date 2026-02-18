import puppeteer from "puppeteer-extra";
import { Page } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { BggScraperPort } from "@/application/ports/BggScraperPort";
import { BggScrapedGameDTO } from "@/application/dto/BggScrapedGameDTO";
import { parseBggGamePage } from "./BggPageParser";

puppeteer.use(StealthPlugin());

export class PuppeteerScraper implements BggScraperPort {
  async scrapeGamePage(id: string): Promise<BggScrapedGameDTO> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/google-chrome",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
    });
    const page = await browser.newPage();

    try {
      await this.optimizeRequests(page);
      await page.goto(`https://boardgamegeek.com/boardgame/${id}`, {
        waitUntil: "networkidle2",
      });
      await page.addScriptTag({
        content: `
          window.__BGG_PARSER__ = ${parseBggGamePage.toString()}
        `,
      });

      return await page.evaluate((url: string) => {
        // Parser roda NO CONTEXTO DO BROWSER
        return (window as any).__BGG_PARSER__(url);
      }, `https://boardgamegeek.com/boardgame/${id}`);
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
