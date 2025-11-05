/*
  Warnings:

  - You are about to drop the column `description` on the `Routine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Routine" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "RoutineSet" ADD COLUMN     "description" TEXT;
