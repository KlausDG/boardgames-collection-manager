import GetBoardgamesByName from "../../application/use-case/GetBoardgamesByName";
import HttpServer from "../http/HttpServer";

export default class BggController {
  constructor(readonly httpServer: HttpServer, readonly getBoardgamesByName: GetBoardgamesByName) {
    httpServer.register("get", "/games/:name", async (params: { name: string }) => {
      const output = await getBoardgamesByName.execute(params.name);
      return output;
    });
  }
}
