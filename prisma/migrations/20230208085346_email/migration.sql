/*
  Warnings:

  - You are about to drop the column `nom` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `Email` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Email" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Email" ("createdAt", "email", "id", "updatedAt") SELECT "createdAt", "email", "id", "updatedAt" FROM "Email";
DROP TABLE "Email";
ALTER TABLE "new_Email" RENAME TO "Email";
CREATE UNIQUE INDEX "Email_email_key" ON "Email"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
