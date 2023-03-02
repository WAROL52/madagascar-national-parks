// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDataExcelSuiviTools } from "@/prisma/data";
import {
  tachesExcecution,
  tachesFormation,
} from "@/tools/SuiviDeProjetHandler";
import { PrismaClient, SiteName } from "@prisma/client";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  console.log(req.body);
  const prisma = new PrismaClient();
  const siteName = Object.keys(SiteName);
  // const suivi = await prisma.suiviExcecution.deleteMany();
  const suivi = [];
  const taches = [...tachesFormation, ...tachesExcecution];
  for (let index = 0; index < taches.length; index++) {
    const tache = taches[index];
    suivi.push(
      await prisma.suiviDeProjet.createMany({
        data: siteName.map((name) => {
          return {
            debutPrevisionnel: tache.debutPrevionnel,
            finPrevisionnel: tache.finPrevisionnel,
            // siteName: name as SiteName,
            tacheName: tache.tacheName,
            projetName: "formation",
          };
        }),
      })
    );
  }
  return res.status(200).json(suivi);
}
