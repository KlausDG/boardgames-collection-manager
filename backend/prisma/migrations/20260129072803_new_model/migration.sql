/*
  Warnings:

  - You are about to drop the column `acquisitionDate` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `inCollection` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `isExpansion` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `isExpansionForBggId` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `languageDependence` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `purchasedPrice` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the `BoardgameSleeveRequirement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SleeveBrand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SleeveProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SleeveSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SleeveStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BoardgameToMechanics` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `languageDependenceLevel` to the `boardgames` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LanguageDependenceLevel" AS ENUM ('NO', 'LOW', 'MODERATE', 'HIGH');

-- DropForeignKey
ALTER TABLE "BoardgameSleeveRequirement" DROP CONSTRAINT "BoardgameSleeveRequirement_boardgameId_fkey";

-- DropForeignKey
ALTER TABLE "BoardgameSleeveRequirement" DROP CONSTRAINT "BoardgameSleeveRequirement_sleeveSizeId_fkey";

-- DropForeignKey
ALTER TABLE "SleeveProduct" DROP CONSTRAINT "SleeveProduct_brandId_fkey";

-- DropForeignKey
ALTER TABLE "SleeveProduct" DROP CONSTRAINT "SleeveProduct_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "SleeveStock" DROP CONSTRAINT "SleeveStock_productId_fkey";

-- DropForeignKey
ALTER TABLE "_BoardgameToMechanics" DROP CONSTRAINT "_BoardgameToMechanics_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardgameToMechanics" DROP CONSTRAINT "_BoardgameToMechanics_B_fkey";

-- DropForeignKey
ALTER TABLE "boardgames" DROP CONSTRAINT "boardgames_isExpansionForBggId_fkey";

-- AlterTable
ALTER TABLE "boardgames" DROP COLUMN "acquisitionDate",
DROP COLUMN "inCollection",
DROP COLUMN "isExpansion",
DROP COLUMN "isExpansionForBggId",
DROP COLUMN "languageDependence",
DROP COLUMN "purchasedPrice",
ADD COLUMN     "baseGameId" INTEGER,
ADD COLUMN     "languageDependenceLevel" "LanguageDependenceLevel" NOT NULL;

-- DropTable
DROP TABLE "BoardgameSleeveRequirement";

-- DropTable
DROP TABLE "SleeveBrand";

-- DropTable
DROP TABLE "SleeveProduct";

-- DropTable
DROP TABLE "SleeveSize";

-- DropTable
DROP TABLE "SleeveStock";

-- DropTable
DROP TABLE "_BoardgameToMechanics";

-- DropEnum
DROP TYPE "LanguageDependences";

-- DropEnum
DROP TYPE "SleeveCategories";

-- CreateTable
CREATE TABLE "purchases" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "boardgameId" INTEGER NOT NULL,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoardgameToMechanic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BoardgameToMechanic_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "purchases_boardgameId_idx" ON "purchases"("boardgameId");

-- CreateIndex
CREATE INDEX "_BoardgameToMechanic_B_index" ON "_BoardgameToMechanic"("B");

-- CreateIndex
CREATE INDEX "boardgames_category_idx" ON "boardgames"("category");

-- CreateIndex
CREATE INDEX "boardgames_publisherId_idx" ON "boardgames"("publisherId");

-- CreateIndex
CREATE INDEX "boardgames_bggId_idx" ON "boardgames"("bggId");

-- AddForeignKey
ALTER TABLE "boardgames" ADD CONSTRAINT "boardgames_baseGameId_fkey" FOREIGN KEY ("baseGameId") REFERENCES "boardgames"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_boardgameId_fkey" FOREIGN KEY ("boardgameId") REFERENCES "boardgames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToMechanic" ADD CONSTRAINT "_BoardgameToMechanic_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToMechanic" ADD CONSTRAINT "_BoardgameToMechanic_B_fkey" FOREIGN KEY ("B") REFERENCES "mechanics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
