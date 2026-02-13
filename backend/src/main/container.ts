import "dotenv/config";
// Infra
import { ExpressAdapter } from "@/infra/http/ExpressAdapter";
import { FastifyAdapter } from "@/infra/http/FastifyAdapter";
import { BggHttpAdapter } from "@/infra/gateway/bgg/BggHttpAdapter";
import { PuppeteerScraper } from "@/infra/gateway/bgg/scraper/PuppeteerScraper";

// Application
import { GetBoardgameFromBggUseCase } from "@/application/usecases/GetBoardgameFromBgg/GetBoardgameFromBggUseCase";
import { SearchBoardgamesByNameUseCase } from "@/application/usecases/SearchBoardgamesByName/SearchBoardgamesByNameUseCase";
import { GetBoardgameController } from "@/infra/http/controllers/GetBoardgameController";

// Ports
import { HttpServer } from "@/application/http/HttpServer";
import { BggApiPort } from "@/application/ports/BggApiPort";
import { BggScraperPort } from "@/application/ports/BggScraperPort";
import { BggXmlApiClient } from "bgg-xml-api-client";
import { SearchBoardgamesByNameController } from "@/infra/http/controllers/SearchBoardgamesByNameController";

export function buildContainer() {
  // 🔌 Infra
  const httpServer: HttpServer = new FastifyAdapter();
  const bggClient = new BggXmlApiClient(process.env["BGG_API_KEY"]!);
  const bggApi: BggApiPort = new BggHttpAdapter(bggClient);
  const bggScraper: BggScraperPort = new PuppeteerScraper();

  // 🧠 Use Cases
  const getBoardgameFromBggUseCase = new GetBoardgameFromBggUseCase(bggApi);
  const searchBoardgamesByNameUseCase = new SearchBoardgamesByNameUseCase(
    bggApi,
  );

  // 🎮 Controllers
  const getBoardgameController = new GetBoardgameController(
    getBoardgameFromBggUseCase,
  );

  const searchBoardgamesByNameController = new SearchBoardgamesByNameController(
    searchBoardgamesByNameUseCase,
  );

  return {
    httpServer,
    controllers: {
      getBoardgameController,
      searchBoardgamesByNameController
    },
  };
}
