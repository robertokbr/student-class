/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Classes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Classes_name_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Classes_name_key" ON "Classes"("name");
