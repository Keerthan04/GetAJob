-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterEnum
ALTER TYPE "ApplicationStatus" ADD VALUE 'SHORTLISTED';

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "jobStatus" "JobStatus" NOT NULL DEFAULT 'ACTIVE';
