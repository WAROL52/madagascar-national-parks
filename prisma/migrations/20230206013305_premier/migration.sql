-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT,
    "prenom" TEXT,
    "motdepasse" TEXT
);

-- CreateTable
CREATE TABLE "Site" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RisqueProjet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "value" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT DEFAULT 'white'
);

-- CreateTable
CREATE TABLE "RisqueTache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "color" TEXT DEFAULT 'white',
    "value" INTEGER NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Etape" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "risqueProjetId" INTEGER NOT NULL,
    "risqueTacheId" INTEGER NOT NULL,
    "progression" INTEGER DEFAULT 0,
    "debutPrevionnel" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "nombreDeJours" INTEGER DEFAULT 0,
    "finPrevisionnel" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "debutReel" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "finReel" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "perturbation" INTEGER DEFAULT 0,
    "tempsConsommes" INTEGER DEFAULT 0,
    "formationId" INTEGER NOT NULL,
    "excecutionId" INTEGER,
    CONSTRAINT "Etape_risqueProjetId_fkey" FOREIGN KEY ("risqueProjetId") REFERENCES "RisqueProjet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Etape_risqueTacheId_fkey" FOREIGN KEY ("risqueTacheId") REFERENCES "RisqueTache" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Etape_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Etape_excecutionId_fkey" FOREIGN KEY ("excecutionId") REFERENCES "Excecution" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResponsableSite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "siteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ResponsableSite_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ResponsableSite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Formation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "siteId" INTEGER NOT NULL,
    CONSTRAINT "Formation_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Excecution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "siteId" INTEGER NOT NULL,
    CONSTRAINT "Excecution_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ResponsableSite_siteId_key" ON "ResponsableSite"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "ResponsableSite_userId_key" ON "ResponsableSite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Formation_siteId_key" ON "Formation"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "Excecution_siteId_key" ON "Excecution"("siteId");
