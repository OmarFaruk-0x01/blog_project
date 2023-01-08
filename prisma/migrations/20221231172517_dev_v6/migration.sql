/*
  Warnings:

  - A unique constraint covering the columns `[label,slug]` on the table `Topics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Topics` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Topics_label_key";

-- AlterTable
ALTER TABLE "Topics" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Topics_label_slug_key" ON "Topics"("label", "slug");
