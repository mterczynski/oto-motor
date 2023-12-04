-- CreateTable
CREATE TABLE "SaleOffer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "priceInPLN" REAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "mileageInKm" INTEGER NOT NULL,
    "imageLink" TEXT,
    "location" TEXT NOT NULL
);
