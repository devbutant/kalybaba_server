-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER_PRE_REGISTERED', 'USER_PENDING', 'USER');

-- CreateEnum
CREATE TYPE "TypeEnum" AS ENUM ('SHARED_SETUP', 'NEED_ADVICE');

-- CreateEnum
CREATE TYPE "CategoryEnum" AS ENUM ('TECH_AND_GADGETS', 'PRODUCTIVITY', 'GAMING', 'CREATIVE_WORKSPACE', 'STUDY_SPACE', 'HOME_OFFICE', 'DIY_AND_CUSTOM_SETUPS', 'MINIMALIST', 'COZY_SPACES', 'COLLABORATIVE_WORKSPACES', 'OTHERS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "city" TEXT,
    "phone" TEXT,
    "connected" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER_PENDING',
    "emailVerificationToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "photos" TEXT[],
    "authorId" TEXT NOT NULL,
    "typeEnum" "TypeEnum" NOT NULL DEFAULT 'SHARED_SETUP',
    "categoryEnum" "CategoryEnum" NOT NULL DEFAULT 'OTHERS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFriends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RoomUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerificationToken_key" ON "User"("emailVerificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFriends_AB_unique" ON "_UserFriends"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFriends_B_index" ON "_UserFriends"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoomUsers_AB_unique" ON "_RoomUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomUsers_B_index" ON "_RoomUsers"("B");

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFriends" ADD CONSTRAINT "_UserFriends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFriends" ADD CONSTRAINT "_UserFriends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomUsers" ADD CONSTRAINT "_RoomUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomUsers" ADD CONSTRAINT "_RoomUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
