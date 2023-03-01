// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { UpdateEmailDto } from "@/prisma/dto/email/dto/update-email.dto";
import { Email } from "@/prisma/dto/email/entities/email.entity";
import { PrismaClient, SiteName } from "@prisma/client";
import { log } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

const emailsResponsableSite: { email: string; siteName: SiteName }[] = [
  {
    email: "juliette_drABT@mnparks.mg",
    siteName: "ABT",
  },
  {
    email: "tahina_drABV@mnparks.mg",
    siteName: "ABV",
  },
  {
    email: "jeaneugene_dpCSM-AHL@mnparks.mg",
    siteName: "AHL_CSM",
  },
  {
    email: "mandimby_dpAKF@mnparks.mg",
    siteName: "AKF",
  },
  {
    email: "herve_dpANK-ANL@mnparks.mg",
    siteName: "ANL_ANK",
  },
  {
    email: "eddy_dpARG@mnparks.mg",
    siteName: "ARG_IVB",
  },
  {
    email: "jocelyn_dpBBL@mnparks.mg",
    siteName: "BBL_TNRK",
  },
  {
    email: "tsipakay_dpBMR@mnparks.mg",
    siteName: "BMR",
  },
  {
    email: "emerentienne_drBTP@mnparks.mg",
    siteName: "BTP_MGV",
  },
  {
    email: "jeanjacques_dpISL@mnparks.mg",
    siteName: "ISL",
  },
  {
    email: "odilion_drKLB@mnparks.mg",
    siteName: "KLB",
  },
  {
    email: "diamondra_dpKRM@mnparks.mg",
    siteName: "KRM_ARN",
  },
  {
    email: "candicia_dpMDA-NSH@mnparks.mg",
    siteName: "MDA_NSH",
  },
  {
    email: "robert_dpMDS@mnparks.mg",
    siteName: "MDS",
  },
  {
    email: "hery_dpMKA@mnparks.mg",
    siteName: "MKA",
  },
  {
    email: "hery_dpMKA@mnparks.mg",
    siteName: "MNB",
  },
  {
    email: "charles_drTST@mnparks.mg",
    siteName: "MNG_TST",
  },
  {
    email: "mamy_dpMNN@mnparks.mg",
    siteName: "MNN",
  },
  {
    email: "willy_dpMRJ@mnparks.mg",
    siteName: "MRJ_ANJ",
  },
  {
    email: "sylvie_dpMRL@mnparks.mg",
    siteName: "MRL",
  },
  {
    email: "antony_dpMRT@mnparks.mg",
    siteName: "MRT",
  },
  {
    email: "fidelis_dpMSL@mnparks.mg",
    siteName: "MSL_NMB",
  },
  {
    email: "herylala_dpMTD@mnparks.mg",
    siteName: "MTD_ALZ",
  },
  {
    email: "landisoa_dpNST@mnparks.mg",
    siteName: "NST",
  },
  {
    email: "vola_dpRAN@mnparks.mg",
    siteName: "RAN",
  },
  {
    email: "nestor_dpSML@mnparks.mg",
    siteName: "SML",
  },
  {
    email: "justin_dpTSP-BZM@mnparks.mg",
    siteName: "TSP_NSV_BZM",
  },
  {
    email: "benoit_dpZHM@mnparks.mg",
    siteName: "ZHM",
  },
  {
    email: "juliette_dpZVB@mnparks.mg",
    siteName: "ZVB",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const email = await prisma.email.createMany({
    data: emailsResponsableSite.map(({ email, siteName }) => {
      return {
        email,
        role: "ResponsableSite",
        siteName,
      };
    }),
  });
  return res.status(200).json(email);
  //   res.status(200).json({ name: "John Doe" });
}
