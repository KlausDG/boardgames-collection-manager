import { Controller } from "@/application/http/Controller";
import { HttpRequest } from "@/application/http/HttpRequest";
import { HttpResponse } from "@/application/http/HttpResponse";
import { AddBoardgameToCollectionUseCase } from "@/application/usecases/add-boardgame-to-collection/add-boardgame-to-collection-usecase";

export class AddBoardgameToCollectionController implements Controller {
  constructor(
    private addBoardgameToCollectionUseCase: AddBoardgameToCollectionUseCase,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const boardgame = request.body;

    if (!boardgame) {
      return {
        statusCode: 400,
        body: { message: "Boardgame inválido" },
      };
    }

      const created = await this.addBoardgameToCollectionUseCase.execute(boardgame);

      return {
        statusCode: 201,
        body: created,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: { message: error.message },
      };
    }
  }
}
