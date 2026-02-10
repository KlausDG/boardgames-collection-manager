import { HttpServer } from "@/application/http/HttpServer";
import { Controller } from "@/application/http/Controller";

type Controllers = {
  getBoardgameController: Controller;
};

export function setupRoutes(
  httpServer: HttpServer,
  controllers: Controllers
) {
  httpServer.register(
    "get",
    "/boardgames/:name",
    controllers.getBoardgameController
  );
}
