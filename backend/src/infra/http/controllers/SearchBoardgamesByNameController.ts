import { Controller } from "@/application/http/Controller";
import { HttpRequest } from "@/application/http/HttpRequest";
import { HttpResponse } from "@/application/http/HttpResponse";
import { SearchBoardgamesByNameUseCase } from "@/application/usecases/SearchBoardgamesByName/SearchBoardgamesByNameUseCase";

export class SearchBoardgamesByNameController implements Controller {
  constructor(private searchBoardgamesByName: SearchBoardgamesByNameUseCase) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const name = request.query?.name;

      console.log(name);
      

      if (!name) {
        return {
          statusCode: 400,
          body: { message: "Nome inválido" },
        };
      }

      const boardgame = await this.searchBoardgamesByName.execute(name);

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
