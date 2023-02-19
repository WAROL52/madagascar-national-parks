-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ResponsableSite', 'Admin', 'SuperAdmin');

-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('Homme', 'Femme');

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "passwordToken" TEXT,
    "role" "Role" NOT NULL DEFAULT 'Admin',

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailId" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "motdepasse" TEXT,
    "tel1" TEXT,
    "tel2" TEXT,
    "adresse" TEXT,
    "dataNaissance" TIMESTAMP(3),
    "lieuNaissance" TEXT,
    "sexe" "Sexe" NOT NULL DEFAULT 'Homme',
    "description" TEXT,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RisqueProjet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT DEFAULT 'white',

    CONSTRAINT "RisqueProjet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RisqueTache" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "color" TEXT DEFAULT 'white',
    "value" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "RisqueTache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etape" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "risqueProjetId" INTEGER NOT NULL,
    "risqueTacheId" INTEGER NOT NULL,
    "progression" INTEGER DEFAULT 0,
    "debutPrevionnel" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "nombreDeJours" INTEGER DEFAULT 0,
    "finPrevisionnel" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "debutReel" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "finReel" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "perturbation" INTEGER DEFAULT 0,
    "tempsConsommes" INTEGER DEFAULT 0,
    "formationId" INTEGER NOT NULL,
    "excecutionId" INTEGER,

    CONSTRAINT "Etape_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResponsableSite" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ResponsableSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siteId" INTEGER NOT NULL,

    CONSTRAINT "Formation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Excecution" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "siteId" INTEGER NOT NULL,

    CONSTRAINT "Excecution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_email_key" ON "Email"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "User"("emailId");

-- CreateIndex
CREATE INDEX "Etape_risqueTacheId_idx" ON "Etape"("risqueTacheId");

-- CreateIndex
CREATE INDEX "Etape_risqueProjetId_idx" ON "Etape"("risqueProjetId");

-- CreateIndex
CREATE INDEX "Etape_formationId_idx" ON "Etape"("formationId");

-- CreateIndex
CREATE INDEX "Etape_excecutionId_idx" ON "Etape"("excecutionId");

-- CreateIndex
CREATE UNIQUE INDEX "ResponsableSite_siteId_key" ON "ResponsableSite"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "ResponsableSite_userId_key" ON "ResponsableSite"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Formation_siteId_key" ON "Formation"("siteId");

-- CreateIndex
CREATE UNIQUE INDEX "Excecution_siteId_key" ON "Excecution"("siteId");
