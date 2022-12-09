-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "promotion" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "promotionPrice" INTEGER,
    "subCategoryId" INTEGER NOT NULL,
    "urlImg" TEXT NOT NULL
);
INSERT INTO "new_Product" ("description", "id", "price", "promotion", "promotionPrice", "subCategoryId", "title", "urlImg") SELECT "description", "id", "price", "promotion", "promotionPrice", "subCategoryId", "title", "urlImg" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
