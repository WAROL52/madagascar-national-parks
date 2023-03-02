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
    const debutReel = data.debutReel && new Date(data.debutReel);
    const email = await prisma.suiviDeProjet.update({
      where: { id: data.id },
      data: {
        debutReel: debutReel || null,
      },
    });
    return res.status(200).json(email);
  }
  //   res.status(200).json({ name: "John Doe" });
}
