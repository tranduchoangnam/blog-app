/*
  Warnings:

  - You are about to drop the column `downvote_count` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `upvote_count` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "downvote_count",
DROP COLUMN "upvote_count";

-- CreateTable
CREATE TABLE "Upvote" (
    "userId" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("userId","blogId")
);

-- CreateTable
CREATE TABLE "Downvote" (
    "userId" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Downvote_pkey" PRIMARY KEY ("userId","blogId")
);

-- CreateTable
CREATE TABLE "Share" (
    "userId" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "Share_pkey" PRIMARY KEY ("userId","blogId")
);

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Downvote" ADD CONSTRAINT "Downvote_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Share" ADD CONSTRAINT "Share_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
