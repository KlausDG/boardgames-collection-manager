import { HttpServer } from "@/application/http/HttpServer";
import { Controller } from "@/application/http/Controller";

type Controllers = {
  getBoardgameController: Controller;
  searchBoardgamesByNameController: Controller;
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
}

// /boardgames/:id -> Busca no BGG por um boardgame específico (detalhes completos)
// /boardgames?name=xyz -> Busca no BGG por boardgames que correspondam ao nome (lista de resultados)
// /boardgames -> Busna no meu banco de dados por todos os boardgames cadastrados (lista de resultados)
