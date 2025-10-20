/*
  Warnings:

  - You are about to drop the column `time` on the `Fregar` table. All the data in the column will be lost.
  - You are about to drop the column `emoji` on the `Horario` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Horario` table. All the data in the column will be lost.
  - Added the required column `horarioId` to the `Fregar` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `date` on the `Fregar` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `descripcion` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Horario" DROP CONSTRAINT "Horario_userId_fkey";

-- AlterTable
ALTER TABLE "Fregar" DROP COLUMN "time",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "horarioId" INTEGER NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Horario" DROP COLUMN "emoji",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descripcion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Fregar" ADD CONSTRAINT "Fregar_horarioId_fkey" FOREIGN KEY ("horarioId") REFERENCES "Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
