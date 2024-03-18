-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stocks" TEXT,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);
