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
import { PrismaBoardgameRepository } from "@/infra/db/PrismaBoardgameRepository";
import { AddBoardgameToCollectionUseCase } from "@/application/usecases/add-boardgame-to-collection/add-boardgame-to-collection-usecase";
import { AddBoardgameToCollectionController } from "@/infra/http/controllers/add-boardgame-to-collection-controller";
import { validateBody } from "@/application/middlewares/validate-body";
import { addBoardgameSchema } from "@/application/schemas/add-boardgame-schema";

export function buildContainer() {
  // 🔌 Infra
  const httpServer: HttpServer = new FastifyAdapter();
  const bggClient = new BggXmlApiClient(process.env["BGG_API_KEY"]!);
  const bggApi: BggApiPort = new BggHttpAdapter(bggClient);
  const bggScraper: BggScraperPort = new PuppeteerScraper();
  const prismaBoardgameRepository = new PrismaBoardgameRepository();

  // 🧠 Use Cases
  const getBoardgameFromBggUseCase = new GetBoardgameFromBggUseCase(bggApi);
  const searchBoardgamesByNameUseCase = new SearchBoardgamesByNameUseCase(
    bggApi,
  );
  const fetchAdditionalBoardgameDataUseCase = new FetchAdditionalBoardgameDataUseCase(bggScraper);
  const addBoardgameToCollectionUseCase = new AddBoardgameToCollectionUseCase(prismaBoardgameRepository);

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

  const addBoardgameToCollectionController = new AddBoardgameToCollectionController(
    addBoardgameToCollectionUseCase
  );

  const addBoardgameControllerWithValidation = validateBody(addBoardgameSchema, addBoardgameToCollectionController);

  return {
    httpServer,
    controllers: {
      getBoardgameController,
      searchBoardgamesByNameController,
      fetchAdditionalGameDataController,
      addBoardgameControllerWithValidation
    },
  };
}
