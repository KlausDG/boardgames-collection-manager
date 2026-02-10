/*
  Warnings:

  - Added the required column `publisherId` to the `boardgames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boardgames" ADD COLUMN     "bestPlayerCount" INTEGER[],
ADD COLUMN     "publisherId" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "category" SET DEFAULT 'STANDALONE';

-- CreateTable
CREATE TABLE "designers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "designers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mechanics" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "mechanics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoardgameToDesigner" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BoardgameToDesigner_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BoardgameToMechanics" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BoardgameToMechanics_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "designers_name_key" ON "designers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "publishers_name_key" ON "publishers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "mechanics_name_key" ON "mechanics"("name");

-- CreateIndex
CREATE INDEX "_BoardgameToDesigner_B_index" ON "_BoardgameToDesigner"("B");

-- CreateIndex
CREATE INDEX "_BoardgameToMechanics_B_index" ON "_BoardgameToMechanics"("B");

-- AddForeignKey
ALTER TABLE "boardgames" ADD CONSTRAINT "boardgames_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToDesigner" ADD CONSTRAINT "_BoardgameToDesigner_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToDesigner" ADD CONSTRAINT "_BoardgameToDesigner_B_fkey" FOREIGN KEY ("B") REFERENCES "designers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToMechanics" ADD CONSTRAINT "_BoardgameToMechanics_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToMechanics" ADD CONSTRAINT "_BoardgameToMechanics_B_fkey" FOREIGN KEY ("B") REFERENCES "mechanics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
