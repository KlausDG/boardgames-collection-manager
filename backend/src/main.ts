import GetBoardgamesByName from "./application/use-case/GetBoardgamesByName";
import BggHttpAdapter from "./infra/adapter/BggHttpAdapter";
import BggController from "./infra/controller/BggController";
import BggHttpGateway from "./infra/gateway/BggGateway";
import { ExpressAdapter } from "./infra/http/HttpServer";

const httpServer = new ExpressAdapter();
const bggAdapter = new BggHttpAdapter();
const bggHttpGateway = new BggHttpGateway(bggAdapter);

const getBoardgamesByName = new GetBoardgamesByName(bggHttpGateway);

new BggController(httpServer, getBoardgamesByName)

httpServer.listen(3000);