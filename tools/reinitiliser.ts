import { Folder } from "@/prisma/dto/folder/entities/folder.entity";
import { PrismaClient, SiteName } from "@prisma/client";
import { GLOBAL_VALUE } from "./configGlobal";
import { prismaClient } from "./prismaService";
import { tachesFormation, tachesExcecution } from "./SuiviDeProjetHandler";

export async function initDataBaseExemple() {
  let deleteResult = null;
  const initResult = [];
  return {
    deleteResult,
    initResult,
  };
}

export async function initDataBaseResponsableDeSite() {
  let deleteResult = null;
  const initResult = await prismaClient.email.createMany({
    data: GLOBAL_VALUE.emailsOfResponsableDeSite.map(({ email, siteName }) => {
      return {
        email,
        role: "ResponsableSite",
        siteName,
      };
    }),
    skipDuplicates: true,
  });
  return {
    deleteResult,
    initResult: await prismaClient.email.findMany({
      where: {
        role: "ResponsableSite",
      },
    }),
  };
}
export async function initDataBaseSuperAdmin() {
  let deleteResult = null;
  const initResult = await prismaClient.email.createMany({
    data: GLOBAL_VALUE.emailsOfSuperAdmin.map(({ email, siteName }) => {
      return {
        email,
        role: "SuperAdmin",
        siteName: "tous",
      };
    }),
  });
  return {
    deleteResult,
    initResult: await prismaClient.email.findMany({
      where: {
        role: "SuperAdmin",
      },
    }),
  };
}
export async function initDataBaseAdmin() {
  let deleteResult = null;
  const initResult = await prismaClient.email.createMany({
    data: GLOBAL_VALUE.emailsOfAdmin.map(({ email, siteName }) => {
      return {
        email,
        role: "Admin",
        siteName: "aucun",
      };
    }),
    skipDuplicates: true,
  });
  return {
    deleteResult,
    initResult: await prismaClient.email.findMany({
      where: {
        role: "Admin",
      },
    }),
  };
}

export async function initDataBaseSuiviDeProjet() {
  const siteName = Object.keys(SiteName);
  const prisma = new PrismaClient();
  const deleteResult = await prisma.suiviDeProjet.deleteMany();
  const suivi = [];
  const taches = [...tachesFormation, ...tachesExcecution];
  for (let index = 0; index < taches.length; index++) {
    const tache = taches[index];
    suivi.push(
      await prisma.suiviDeProjet.createMany({
        data: siteName.map((name) => {
          return {
            debutPrevisionnel: new Date(tache.debutPrevionnel),
            finPrevisionnel: new Date(tache.finPrevisionnel),
            siteName: name as SiteName,
            tacheName: tache.tacheName,
            projetName: tache.projetName,
          };
        }),
      })
    );
  }
  return {
    deleteResult,
    initResult: await prismaClient.suiviDeProjet.findMany(),
  };
}
export async function initDataBaseDocuments() {
  const siteName = Object.keys(SiteName);
  const deleteAllFolder = async () => {
    const deleteFolderFilds = async () => {
      const result = await prismaClient.folder.findMany({
        include: {
          folderChilds: true,
        },
      });
      if (result.length) {
        const folders = result.filter((f) => !f.folderChilds.length);
        for (let index = 0; index < folders.length; index++) {
          const element = folders[index];
          await prismaClient.folder.delete({ where: { id: element.id } });
        }
        return deleteFolderFilds();
      }
    };
    return await deleteFolderFilds();
  };
  await deleteAllFolder();
  const suivi = (await prismaClient.folder.create({
    data: {
      folderName: "ROOT",
      folderPathName: "/",
      folderChilds: {
        createMany: {
          data: [
            {
              folderName: "Public",
              folderPathName: "/Public",
            },
            {
              folderName: "Sites",
              folderPathName: "/Sites",
            },
          ],
        },
      },
    },
    include: {
      folderChilds: true,
    },
  })) as Folder;
  const folderOfSites = suivi.folderChilds.find(
    (folder) => folder.folderName === "Sites"
  );
  if (!folderOfSites) return await prismaClient.folder.findMany();
  const siteNameFolder = await prismaClient.folder.createMany({
    data: siteName
      .filter((name) => !name.includes("_"))
      .map((name) => ({
        folderName: name,
        folderPathName: "/Sites/" + name,
        folderParentId: folderOfSites.id,
      })),
  });
  return await prismaClient.folder.findMany();
}
