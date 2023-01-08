/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Topics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `Topics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Topics_label_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Topics_slug_key" ON "Topics"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topics_label_key" ON "Topics"("label");
