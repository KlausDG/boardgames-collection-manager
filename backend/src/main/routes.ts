import { HttpServer } from "@/application/http/HttpServer";
import { Controller } from "@/application/http/Controller";

type Controllers = {
  getBoardgameController: Controller;
  searchBoardgamesByNameController: Controller;
  fetchAdditionalGameDataController: Controller;
};

export function setupRoutes(httpServer: HttpServer, controllers: Controllers) {
  httpServer.register(
    "get",
    "/boardgames/search",
    controllers.searchBoardgamesByNameController,
  );
  httpServer.register(
    "get",
    "/boardgames/:id",
    controllers.getBoardgameController,
  );
  httpServer.register(
    "get",
    "/boardgames/:id/additional-data",
    controllers.fetchAdditionalGameDataController,
  );
}
