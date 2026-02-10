import { Boardgame } from "@/domain/entities/Boardgame";

export interface BoardgameRepository {
  existsByBggId(bggId: number): Promise<boolean>;
  save(boardgame: Boardgame): Promise<Boardgame>;
  findByBggId(bggId: number): Promise<Boardgame | null>;
}
