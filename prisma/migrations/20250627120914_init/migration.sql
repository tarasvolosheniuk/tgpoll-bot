-- CreateTable
CREATE TABLE "PollResult" (
    "id" SERIAL NOT NULL,
    "groupId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PollResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PollResult_groupId_createdAt_key" ON "PollResult"("groupId", "createdAt");
