import { buildContainer } from "./container";
import { setupRoutes } from "./routes";

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
  const { httpServer, controllers } = buildContainer();

  setupRoutes(httpServer, controllers);

  httpServer.listen(PORT);
}

bootstrap();
