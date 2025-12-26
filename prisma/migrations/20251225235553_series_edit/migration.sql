/*
  Warnings:

  - You are about to alter the column `intensity` on the `Series` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "rir" INTEGER,
ALTER COLUMN "intensity" SET DATA TYPE INTEGER;
