-- DropIndex
DROP INDEX "Classes_name_key";

-- AlterTable
ALTER TABLE "Classes" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Classes_name_idx" ON "Classes" USING HASH ("name");
