import "dotenv/config";
// Infra
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
import { FetchAdditionalBoardgameDataUseCase } from "@/application/usecases/fetch-additional-boardgame-data/fetch-additional-boardgame-data-usecase";
import { FetchAdditionalGameDataController } from "@/infra/http/controllers/FetchAdditionalGameDataController";

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
  const fetchAdditionalBoardgameDataUseCase = new FetchAdditionalBoardgameDataUseCase(bggScraper);

  // 🎮 Controllers
  const getBoardgameController = new GetBoardgameController(
    getBoardgameFromBggUseCase,
  );

  const searchBoardgamesByNameController = new SearchBoardgamesByNameController(
    searchBoardgamesByNameUseCase,
  );

  const fetchAdditionalGameDataController = new FetchAdditionalGameDataController(
    fetchAdditionalBoardgameDataUseCase
  );

  return {
    httpServer,
    controllers: {
      getBoardgameController,
      searchBoardgamesByNameController,
      fetchAdditionalGameDataController
    },
  };
}
