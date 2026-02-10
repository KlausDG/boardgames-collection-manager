import { BoardgameRepository } from "@/application/ports/BoardgameRepository";
import { Boardgame } from "@/domain/entities/Boardgame";
import { prisma } from "@/infra/db/PrismaClient";

export class PrismaBoardgameRepository implements BoardgameRepository {
  async existsByBggId(bggId: number): Promise<boolean> {
    const count = await prisma.boardgame.count({ where: { bggId } });
    return count > 0;
  }

  async findByBggId(bggId: number): Promise<Boardgame | null> {
    const found = await prisma.boardgame.findUnique({
      where: { bggId },
      include: {
        publisher: true,
        designers: true,
        mechanics: true,
        expansionReferences: true,
        ownedAsExpansionReference: true,
        purchases: true,
      },
    });

    if (!found) return null;
    return Boardgame.fromPersistence(found);
  }

  async save(boardgame: Boardgame): Promise<Boardgame> {
    // 1️⃣ Cria o Boardgame principal
    const savedGame = await prisma.boardgame.create({
      data: {
        name: boardgame.props.name,
        bggId: boardgame.props.bggId,
        description: boardgame.props.description,
        yearPublished: boardgame.props.yearPublished,
        minPlayers: boardgame.props.minPlayers,
        maxPlayers: boardgame.props.maxPlayers,
        bestPlayerCount: boardgame.props.bestPlayerCount,
        weight: boardgame.props.weight,
        bggRank: boardgame.props.bggRank,
        bggLink: boardgame.props.bggLink,
        category: "STANDALONE",
        publisher: {
          connectOrCreate: {
            where: { name: boardgame.props.publishers[0] },
            create: { name: boardgame.props.publishers[0] },
          },
        },
        designers: {
          connectOrCreate: boardgame.props.designers.map((d) => ({
            where: { name: d },
            create: { name: d },
          })),
        },
        mechanics: {
          connectOrCreate: boardgame.props.mechanics.map((m) => ({
            where: { name: m },
            create: { name: m },
          })),
        },
      },
    });

    // 2️⃣ Cria as referências de expansões
    for (const exp of boardgame.props.expansions) {
      let ownedExpansionId: number | null = null;

      if (exp.owned) {
        // Cria o Boardgame para a expansão possuída
        const ownedBoardgame = await prisma.boardgame.create({
          data: {
            name: exp.name,
            bggId: exp.bggId,
            category: "EXPANSION",
            publisher: {
              connectOrCreate: {
                where: { name: boardgame.props.publishers[0] },
                create: { name: boardgame.props.publishers[0] },
              },
            },
          },
        });
        ownedExpansionId = ownedBoardgame.id;
      }

      // Cria a ExpansionReference
      await prisma.expansionReference.create({
        data: {
          name: exp.name,
          bggId: exp.bggId,
          baseGameId: savedGame.id,
          ownedExpansionId, // null se não possuir
        },
      });
    }

    // 3️⃣ Retorna o Boardgame reconstruído
    const gameWithRelations = await prisma.boardgame.findUnique({
      where: { id: savedGame.id },
      include: {
        publisher: true,
        designers: true,
        mechanics: true,
        expansionReferences: true,
        ownedAsExpansionReference: true,
        purchases: true,
      },
    });

    return Boardgame.fromPersistence(gameWithRelations);
  }
}
