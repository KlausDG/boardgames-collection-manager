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

export function buildContainer() {
  // 🔌 Infra
  const httpServer: HttpServer = new ExpressAdapter();
  const bggApi: BggApiPort = new BggHttpAdapter();
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
