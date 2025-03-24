/*
  Warnings:

  - You are about to drop the column `inspiredBy` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `linkedValueId` on the `Question` table. All the data in the column will be lost.
  - Added the required column `alignedWith` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `evaluates` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_linkedValueId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "inspiredBy",
DROP COLUMN "linkedValueId",
ADD COLUMN     "alignedWith" "InspiredBy" NOT NULL,
ADD COLUMN     "evaluates" TEXT NOT NULL;
