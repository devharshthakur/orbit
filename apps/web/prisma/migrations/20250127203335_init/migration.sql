-- CreateTable
CREATE TABLE "CompressionHistory" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "sizeBefore" DOUBLE PRECISION NOT NULL,
    "sizeAfter" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CompressionHistory_pkey" PRIMARY KEY ("id")
);
