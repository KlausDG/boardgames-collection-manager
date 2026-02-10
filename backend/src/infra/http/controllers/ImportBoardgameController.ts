import { ImportBoardgameUseCase } from "@/application/usecases/ImportBoardgame/ImportBoardgameUseCase";
import { HttpError } from "@/shared/errors/HttpError";

export class ImportBoardgameController {
  constructor(private readonly useCase: ImportBoardgameUseCase) {}

  async handle(params: any, body: any) {
    const { bggId, ownedExpansionIds } = body;

    if (!bggId) {
      throw new HttpError(400, "bggId is required");
    }

    const result = await this.useCase.execute({
      bggId: Number(bggId),
      ownedExpansionIds,
    });

    return result;
  }
}
