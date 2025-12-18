/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,order]` on the table `TrainingSessionExercise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `TrainingSessionExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingSessionExercise" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TrainingSessionExercise_sessionId_order_key" ON "TrainingSessionExercise"("sessionId", "order");
