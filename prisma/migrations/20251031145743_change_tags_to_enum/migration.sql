/*
  Warnings:

  - The `tags` column on the `Memorial` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('FOUNDER', 'LEADER', 'CONTRIBUTOR', 'INNOVATOR', 'MENTOR', 'VOLUNTEER');

-- AlterTable
ALTER TABLE "Memorial" DROP COLUMN "tags",
ADD COLUMN     "tags" "Tag"[];
