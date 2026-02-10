-- CreateEnum
CREATE TYPE "BoardgameCategories" AS ENUM ('STANDALONE', 'EXPANSION', 'ADDON', 'EXTRA', 'ACCESSORY');

-- CreateEnum
CREATE TYPE "LanguageDependences" AS ENUM ('NO', 'LOW', 'MODERATE', 'HIGH');

-- CreateEnum
CREATE TYPE "SleeveCategories" AS ENUM ('SLIM', 'REGULAR', 'PREMIUM', 'ULTRA_PREMIUM');

-- CreateTable
CREATE TABLE "boardgames" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT,
    "yearPublished" INTEGER,
    "language" TEXT,
    "minPlayers" INTEGER DEFAULT 1,
    "maxPlayers" INTEGER,
    "bestPlayerCount" INTEGER[],
    "minPlaytime" INTEGER,
    "maxPlaytime" INTEGER,
    "weight" DOUBLE PRECISION,
    "languageDependence" "LanguageDependences" NOT NULL,
    "bggRank" INTEGER,
    "bggLink" TEXT,
    "bggId" INTEGER NOT NULL,
    "inCollection" BOOLEAN NOT NULL DEFAULT true,
    "category" "BoardgameCategories" NOT NULL DEFAULT 'STANDALONE',
    "purchasedPrice" DOUBLE PRECISION,
    "acquisitionDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isExpansion" BOOLEAN NOT NULL DEFAULT false,
    "isExpansionForBggId" INTEGER,
    "publisherId" INTEGER NOT NULL,

    CONSTRAINT "boardgames_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "SleeveSize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SleeveSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleeveStock" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "SleeveStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleeveProduct" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "category" "SleeveCategories" NOT NULL,
    "sleevesPerPack" INTEGER NOT NULL,

    CONSTRAINT "SleeveProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleeveBrand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SleeveBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardgameSleeveRequirement" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "boardgameId" INTEGER NOT NULL,
    "sleeveSizeId" INTEGER NOT NULL,

    CONSTRAINT "BoardgameSleeveRequirement_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "boardgames_name_key" ON "boardgames"("name");

-- CreateIndex
CREATE UNIQUE INDEX "boardgames_bggId_key" ON "boardgames"("bggId");

-- CreateIndex
CREATE UNIQUE INDEX "designers_name_key" ON "designers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "publishers_name_key" ON "publishers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "mechanics_name_key" ON "mechanics"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SleeveSize_name_key" ON "SleeveSize"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SleeveBrand_name_key" ON "SleeveBrand"("name");

-- CreateIndex
CREATE INDEX "_BoardgameToDesigner_B_index" ON "_BoardgameToDesigner"("B");

-- CreateIndex
CREATE INDEX "_BoardgameToMechanics_B_index" ON "_BoardgameToMechanics"("B");

-- AddForeignKey
ALTER TABLE "boardgames" ADD CONSTRAINT "boardgames_isExpansionForBggId_fkey" FOREIGN KEY ("isExpansionForBggId") REFERENCES "boardgames"("bggId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardgames" ADD CONSTRAINT "boardgames_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleeveStock" ADD CONSTRAINT "SleeveStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "SleeveProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleeveProduct" ADD CONSTRAINT "SleeveProduct_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "SleeveBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleeveProduct" ADD CONSTRAINT "SleeveProduct_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "SleeveSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgameSleeveRequirement" ADD CONSTRAINT "BoardgameSleeveRequirement_boardgameId_fkey" FOREIGN KEY ("boardgameId") REFERENCES "boardgames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgameSleeveRequirement" ADD CONSTRAINT "BoardgameSleeveRequirement_sleeveSizeId_fkey" FOREIGN KEY ("sleeveSizeId") REFERENCES "SleeveSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToDesigner" ADD CONSTRAINT "_BoardgameToDesigner_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToDesigner" ADD CONSTRAINT "_BoardgameToDesigner_B_fkey" FOREIGN KEY ("B") REFERENCES "designers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToMechanics" ADD CONSTRAINT "_BoardgameToMechanics_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToMechanics" ADD CONSTRAINT "_BoardgameToMechanics_B_fkey" FOREIGN KEY ("B") REFERENCES "mechanics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
