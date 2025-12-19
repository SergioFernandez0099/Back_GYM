/*
  Warnings:

  - A unique constraint covering the columns `[routineId,order]` on the table `RoutineSet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `RoutineSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoutineSet" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoutineSet_routineId_order_key" ON "RoutineSet"("routineId", "order");
