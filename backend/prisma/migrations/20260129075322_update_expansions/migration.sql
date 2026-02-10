/*
  Warnings:

  - You are about to drop the column `baseGameId` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `bestPlayerCount` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `languageDependenceLevel` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `publisherId` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the `_BoardgameToDesigner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BoardgameToMechanic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `designers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mechanics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `publishers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BoardgameToDesigner" DROP CONSTRAINT "_BoardgameToDesigner_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardgameToDesigner" DROP CONSTRAINT "_BoardgameToDesigner_B_fkey";

-- DropForeignKey
ALTER TABLE "_BoardgameToMechanic" DROP CONSTRAINT "_BoardgameToMechanic_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardgameToMechanic" DROP CONSTRAINT "_BoardgameToMechanic_B_fkey";

-- DropForeignKey
ALTER TABLE "boardgames" DROP CONSTRAINT "boardgames_baseGameId_fkey";

-- DropForeignKey
ALTER TABLE "boardgames" DROP CONSTRAINT "boardgames_publisherId_fkey";

-- DropIndex
DROP INDEX "boardgames_name_key";

-- DropIndex
DROP INDEX "boardgames_publisherId_idx";

-- AlterTable
ALTER TABLE "boardgames" DROP COLUMN "baseGameId",
DROP COLUMN "bestPlayerCount",
DROP COLUMN "language",
DROP COLUMN "languageDependenceLevel",
DROP COLUMN "publisherId",
DROP COLUMN "thumbnail",
ALTER COLUMN "minPlayers" DROP DEFAULT,
ALTER COLUMN "category" DROP DEFAULT;

-- DropTable
DROP TABLE "_BoardgameToDesigner";

-- DropTable
DROP TABLE "_BoardgameToMechanic";

-- DropTable
DROP TABLE "designers";

-- DropTable
DROP TABLE "mechanics";

-- DropTable
DROP TABLE "publishers";

-- DropEnum
DROP TYPE "LanguageDependenceLevel";

-- CreateTable
CREATE TABLE "expansion_references" (
    "id" SERIAL NOT NULL,
    "bggId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "baseGameId" INTEGER NOT NULL,
    "ownedExpansionId" INTEGER,

    CONSTRAINT "expansion_references_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "expansion_references_ownedExpansionId_key" ON "expansion_references"("ownedExpansionId");

-- CreateIndex
CREATE INDEX "expansion_references_bggId_idx" ON "expansion_references"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "expansion_references_baseGameId_bggId_key" ON "expansion_references"("baseGameId", "bggId");

-- AddForeignKey
ALTER TABLE "expansion_references" ADD CONSTRAINT "expansion_references_baseGameId_fkey" FOREIGN KEY ("baseGameId") REFERENCES "boardgames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expansion_references" ADD CONSTRAINT "expansion_references_ownedExpansionId_fkey" FOREIGN KEY ("ownedExpansionId") REFERENCES "boardgames"("id") ON DELETE SET NULL ON UPDATE CASCADE;
