/*
  Warnings:

  - You are about to drop the column `notes` on the `TrainingSessionExercise` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `TrainingSessionExercise` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `TrainingSessionExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TrainingSessionExercise" DROP COLUMN "notes",
DROP COLUMN "repetitions",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "Repetition" (
    "id" SERIAL NOT NULL,
    "trainingSessionExerciseId" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "completed" BOOLEAN NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Repetition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Repetition" ADD CONSTRAINT "Repetition_trainingSessionExerciseId_fkey" FOREIGN KEY ("trainingSessionExerciseId") REFERENCES "TrainingSessionExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
