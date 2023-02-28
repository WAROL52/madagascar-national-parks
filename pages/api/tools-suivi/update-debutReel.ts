// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { UpdateEmailDto } from "@/prisma/dto/email/dto/update-email.dto";
import { Email } from "@/prisma/dto/email/entities/email.entity";
import { PrismaClient } from "@prisma/client";
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
      debutReel: string | Date;
      finReel: string | Date | null;
    };
    console.log(data.debutReel);
    const progression = data.debutReel && data.finReel ? 100 : 50;
    const email = await prisma.suiviFormation.update({
      where: { id: data.id },
      data: {
        debutReel: new Date(data.debutReel),
        progression,
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
