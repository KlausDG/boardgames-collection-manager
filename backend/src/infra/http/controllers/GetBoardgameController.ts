import { GetBoardgameFromBggUseCase } from "@/application/usecases/GetBoardgameFromBgg/GetBoardgameFromBggUseCase";
import { Request, Response } from "express";

export class GetBoardgameController {
  constructor(private getBoardgameFromBgg: GetBoardgameFromBggUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const name = req.params.name;
      if (!name) return res.status(400).json({ message: "Nome inválido" });

      const boardgame = await this.getBoardgameFromBgg.execute(name);
      res.json(boardgame);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
}
