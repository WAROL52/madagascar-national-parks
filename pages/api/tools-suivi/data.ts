// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDataExcelSuiviTools } from "@/prisma/data";
import { PrismaClient, SiteName } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  console.log(req.body);
  const prisma = new PrismaClient();
  const siteName = Object.keys(SiteName);
  const suivi = [];
  const d = await prisma.test.create({
    data: { nom: "Rolio" },
  });
  // .create({
  //   data: {
  //     debutPrevionnel: "06-22-2023",
  //     finPrevisionnel: "06-22-2023",
  //     nombreDeJours: 1,
  //     siteName: "ABT",
  //     tacheName: "ANALYSE_TERROIR_ET_RESTRUCTURATION_DES_CLP",
  //   },
  // });

  // for (let index = 0; index < siteName.length; index++) {
  //   const element = siteName[index] as SiteName;
  //   suivi.push(
  //     await prisma.suiviFormation.create({
  //       data: {
  //         debutPrevionnel: new Date("06-22-2023"),
  //         nombreDeJours: 1,
  //         finPrevisionnel: new Date("06-22-2023"),
  //         siteName: element,
  //         tacheName: "ANALYSE_TERROIR_ET_RESTRUCTURATION_DES_CLP",
  //       },
  //     })
  //   );
  // }
  return res.status(200).json(d);
}
