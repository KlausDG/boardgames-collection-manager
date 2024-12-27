import GetBoardgameDetails from "../../application/use-case/GetBoardgameDetails";
import GetBoardgamesByName from "../../application/use-case/GetBoardgamesByName";
import HttpServer from "../http/HttpServer";

export default class BggController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getBoardgamesByName: GetBoardgamesByName,
    getBoardgameDetails: GetBoardgameDetails
  ) {
    httpServer.register("get", "/bgg/games/:name", async (params: { name: string }) => {
      const output = await getBoardgamesByName.execute(params.name);
      return output;
    });

    httpServer.register("get", "/bgg/game/:id", async (params: { id: string }) => {
      const output = await getBoardgameDetails.execute(parseInt(params.id));
      return output;
    });
  }
}
