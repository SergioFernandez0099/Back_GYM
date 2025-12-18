/*
  Warnings:

  - You are about to drop the `Repetition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Repetition" DROP CONSTRAINT "Repetition_trainingSessionExerciseId_fkey";

-- DropTable
DROP TABLE "public"."Repetition";

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "sessionExerciseId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION,
    "intensity" DOUBLE PRECISION,
    "unitId" INTEGER,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Series_sessionExerciseId_order_key" ON "Series"("sessionExerciseId", "order");

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_sessionExerciseId_fkey" FOREIGN KEY ("sessionExerciseId") REFERENCES "TrainingSessionExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
