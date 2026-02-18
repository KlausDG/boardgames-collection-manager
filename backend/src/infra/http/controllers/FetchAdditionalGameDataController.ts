import { Controller } from "@/application/http/Controller";
import { HttpRequest } from "@/application/http/HttpRequest";
import { HttpResponse } from "@/application/http/HttpResponse";
import { FetchAdditionalBoardgameDataUseCase } from "@/application/usecases/fetch-additional-boardgame-data/fetch-additional-boardgame-data-usecase";

export class FetchAdditionalGameDataController implements Controller {
  constructor(private fetch: FetchAdditionalBoardgameDataUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const id = request.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: { message: "Id inválido" },
        };
      }

      const data = await this.fetch.execute(id);

      return {
        statusCode: 200,
        body: data,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { message: error.message },
      };
    }
  }
}
