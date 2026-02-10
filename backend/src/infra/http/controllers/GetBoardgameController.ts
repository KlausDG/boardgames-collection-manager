import { Controller } from "@/application/http/Controller";
import { HttpRequest } from "@/application/http/HttpRequest";
import { HttpResponse } from "@/application/http/HttpResponse";
import { GetBoardgameFromBggUseCase } from "@/application/usecases/GetBoardgameFromBgg/GetBoardgameFromBggUseCase";

export class GetBoardgameController implements Controller {
  constructor(private getBoardgameFromBgg: GetBoardgameFromBggUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const name = request.params?.name;

      if (!name) {
        return {
          statusCode: 400,
          body: { message: "Nome inválido" },
        };
      }

      const boardgame = await this.getBoardgameFromBgg.execute(name);

      return {
        statusCode: 200,
        body: boardgame,
      };
    } catch (error: any) {
      console.error(error);

      return {
        statusCode: 500,
        body: { message: error.message },
      };
    }
  }
}
