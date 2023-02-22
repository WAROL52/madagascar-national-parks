// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDataExcelSuiviTools } from "@/prisma/data";
import { PrismaClient, SiteName } from "@prisma/client";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
const tachesFormation = [
  {
    tacheName: "ANALYSE TERROIR ET RESTRUCTURATION DES CLP",
    debutPrevionnel: new Date("06/02/2023"),
    finPrevisionnel: new Date("06/02/2023"),
    etape: 1,
  },
  {
    tacheName: "ANALYSE DES PARTIES PRENANTES et RESTRUCTURATION COSAP ",
    debutPrevionnel: new Date("06/03/2023"),
    finPrevisionnel: new Date("07/03/2023"),
    etape: 2,
  },
  {
    tacheName:
      "IDENTIFICATION LOCALITE CIBLE, BENEFICIAIRES, MICROPROJET, APPROCHE GENRE, INDICATEURS ",
    debutPrevionnel: new Date("06/04/2023"),
    finPrevisionnel: new Date("07/04/2023"),
    etape: 3,
  },
  {
    tacheName: "IMPACTS, PGES, RISQUES, MGP ",
    debutPrevionnel: new Date("08/05/2023"),
    finPrevisionnel: new Date("09/05/2023"),
    etape: 4,
  },
  {
    tacheName: "RESTITUTION AUX COMMUNAUTES",
    debutPrevionnel: new Date("06/06/2023"),
    finPrevisionnel: new Date("06/06/2023"),
    etape: 5,
  },
  {
    tacheName: "EVALUATION PARTICIPATIVE ",
    debutPrevionnel: new Date("01/07/2023"),
    finPrevisionnel: new Date("01/07/2023"),
    etape: 6,
  },
] as const;
const tachesExcecution = [
  {
    tacheName: "ANALYSE TERROIR ET RESTRUCTURATION DES CLP",
    debutPrevionnel: new Date("07/02/2023"),
    finPrevisionnel: new Date("05/03/2023"),
    etape: 1,
  },
  {
    tacheName: "ANALYSE DES PARTIES PRENANTES et RESTRUCTURATION COSAP ",
    debutPrevionnel: new Date("08/03/2023"),
    finPrevisionnel: new Date("05/04/2023"),
    etape: 2,
  },
  {
    tacheName:
      "IDENTIFICATION LOCALITE CIBLE, BENEFICIAIRES, MICROPROJET, APPROCHE GENRE, INDICATEURS ",
    debutPrevionnel: new Date("08/04/2023"),
    finPrevisionnel: new Date("07/05/2023"),
    etape: 3,
  },
  {
    tacheName: "IMPACTS, PGES, RISQUES, MGP ",
    debutPrevionnel: new Date("10/05/2023"),
    finPrevisionnel: new Date("05/06/2023"),
    etape: 4,
  },
  {
    tacheName: "RESTITUTION AUX COMMUNAUTES",
    debutPrevionnel: new Date("07/06/2023"),
    finPrevisionnel: new Date("30/06/2023"),
    etape: 5,
  },
  {
    tacheName: "EVALUATION PARTICIPATIVE ",
    debutPrevionnel: new Date("02/07/2023"),
    finPrevisionnel: new Date("03/07/2023"),
    etape: 6,
  },
] as const;
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
  for (let index = 0; index < tachesExcecution.length; index++) {
    const tache = tachesExcecution[index];
    suivi.push(
      await prisma.suiviExcecution.createMany({
        data: siteName.map((name) => {
          return {
            debutPrevionnel: tache.debutPrevionnel,
            finPrevisionnel: tache.finPrevisionnel,
            nombreDeJours:
              moment(tache.finPrevisionnel).diff(
                tache.debutPrevionnel,
                "days"
              ) + 1,
            siteName: name as SiteName,
            tacheName: tache.tacheName,
          };
        }),
      })
    );
  }
  return res.status(200).json(suivi);
}
