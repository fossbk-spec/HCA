-- AlterTable
ALTER TABLE "Civilization" ADD COLUMN "nameVi" TEXT,
ADD COLUMN "regionVi" TEXT,
ADD COLUMN "summaryVi" TEXT,
ADD COLUMN "contentVi" TEXT;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN "nameVi" TEXT,
ADD COLUMN "occupationsVi" TEXT,
ADD COLUMN "summaryVi" TEXT,
ADD COLUMN "contentVi" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN "titleVi" TEXT,
ADD COLUMN "summaryVi" TEXT,
ADD COLUMN "contentVi" TEXT;

-- AlterTable
ALTER TABLE "Idea" ADD COLUMN "titleVi" TEXT,
ADD COLUMN "categoryVi" TEXT,
ADD COLUMN "summaryVi" TEXT,
ADD COLUMN "contentVi" TEXT;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN "titleVi" TEXT,
ADD COLUMN "authorVi" TEXT,
ADD COLUMN "summaryVi" TEXT,
ADD COLUMN "contentVi" TEXT;
