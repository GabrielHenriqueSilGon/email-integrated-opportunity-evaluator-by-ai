-- AlterTable
ALTER TABLE "Opportunity" ADD COLUMN     "verdict" TEXT,
ALTER COLUMN "analysis" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL;
