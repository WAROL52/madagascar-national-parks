// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { UpdateEmailDto } from "@/prisma/dto/email/dto/update-email.dto";
import { Email } from "@/prisma/dto/email/entities/email.entity";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const data = req.body as {
      email: Email;
      id: number;
      finReel: string | Date;
      debutReel: string | Date;
    };
    console.log(data.finReel);
    const progression = data.debutReel && data.finReel ? 100 : 50;
    const finReel = new Date(data.finReel);
    const debutReel = new Date(data.debutReel);
    const tempsConsommes = moment(finReel).diff(debutReel, "days");
    const nombreDeJours = 1;
    const perturbation =
      tempsConsommes - nombreDeJours < 0 ? 0 : tempsConsommes - nombreDeJours;
    const email = await prisma.suiviExcecution.update({
      where: { id: data.id },
      data: {
        finReel,
        progression,
        tempsConsommes,
        perturbation,
      },
      include: {
        Responsables: true,
      },
    });
    console.log(email);
    return res.status(200).json(email);
  }
  //   res.status(200).json({ name: "John Doe" });
}
