import "dotenv/config";
// Infra
import { ExpressAdapter } from "@/infra/http/ExpressAdapter";
import { BggHttpAdapter } from "@/infra/external/bgg/BggHttpAdapter";
import { PuppeteerScraper } from "@/infra/external/bgg/scraper/PuppeteerScraper";

// Application
import { GetBoardgameFromBggUseCase } from "@/application/usecases/GetBoardgameFromBgg/GetBoardgameFromBggUseCase";
import { GetBoardgameController } from "@/infra/http/controllers/GetBoardgameController";

// Ports
import { HttpServer } from "@/application/http/HttpServer";
import { BggApiPort } from "@/application/ports/BggApiPort";
import { BggScraperPort } from "@/application/ports/BggScraperPort";
import { BggXmlApiClient } from "bgg-xml-api-client";

console.log(process.env["BGG_API_KEY"]);


export function buildContainer() {
  // 🔌 Infra
  const httpServer: HttpServer = new ExpressAdapter();
  const bggClient = new BggXmlApiClient(process.env["BGG_API_KEY"]!);
  const bggApi: BggApiPort = new BggHttpAdapter(bggClient);
  const bggScraper: BggScraperPort = new PuppeteerScraper();

  // 🧠 Use Cases
  const getBoardgameFromBggUseCase = new GetBoardgameFromBggUseCase(bggApi);

  // 🎮 Controllers
  const getBoardgameController = new GetBoardgameController(
    getBoardgameFromBggUseCase,
  );

  return {
    httpServer,
    controllers: {
      getBoardgameController,
    },
  };
}
