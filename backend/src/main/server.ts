import { buildContainer } from "./container";
import { setupRoutes } from "./routes";

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  const { httpServer, controllers } = buildContainer();

  setupRoutes(httpServer, [
    {
      method: "get",
      path: "/boardgames/search",
      controller: controllers.searchBoardgamesByNameController,
    },
    {
      method: "get",
      path: "/boardgames/:id",
      controller: controllers.getBoardgameController,
    },
    {
      method: "get",
      path: "/boardgames/:id/additional-data",
      controller: controllers.fetchAdditionalGameDataController,
    },
    {
      method: "post",
      path: "/boardgames/",
      controller: controllers.addBoardgameControllerWithValidation,
    },
  ]);

  httpServer.listen(PORT);
}

bootstrap();
