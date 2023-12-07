-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SaleOffer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "priceInPLN" REAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "mileageInKm" INTEGER NOT NULL,
    "imageLink" TEXT,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_SaleOffer" ("brand", "description", "id", "imageLink", "location", "mileageInKm", "model", "priceInPLN") SELECT "brand", "description", "id", "imageLink", "location", "mileageInKm", "model", "priceInPLN" FROM "SaleOffer";
DROP TABLE "SaleOffer";
ALTER TABLE "new_SaleOffer" RENAME TO "SaleOffer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
