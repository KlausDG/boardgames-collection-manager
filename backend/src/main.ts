import GetBoardgameDetails from "./application/use-case/GetBoardgameDetails";
import GetBoardgamesByName from "./application/use-case/GetBoardgamesByName";
import BggHttpAdapter from "./infra/adapter/BggHttpAdapter";
import BggController from "./infra/controller/BggController";
import BggHttpGateway from "./infra/gateway/BggGateway";
import { ExpressAdapter } from "./infra/http/HttpServer";

const httpServer = new ExpressAdapter();
const bggAdapter = new BggHttpAdapter();
const bggHttpGateway = new BggHttpGateway(bggAdapter);

const getBoardgamesByName = new GetBoardgamesByName(bggHttpGateway);
const getBoardgameDetails = new GetBoardgameDetails(bggHttpGateway);

new BggController(httpServer, getBoardgamesByName, getBoardgameDetails);

httpServer.listen(3000);

/**
 * TO-DO
 * - GET - Scrapped data from BGG
 *    -> Usado juntamente com a busca anterior
 * - POST - Save Boardgame
 * - GET - Boardgames
 * - GET - Boardgames by Mechanic
 * - GET - Boardgames by Designer
 * - GET - Boardgames Expansions
 * - GET - Boardgame by id
 * - GET - Boardgame by best player count
 * - GET - Generate PDF of Boardgames best with a scpecific amount of players
 * - GET - Seed Json of the collection
 * - GET - Purchased Price Report
 * - GET - Game Weight Report
 * - GET - Purchased Price Report
 */
