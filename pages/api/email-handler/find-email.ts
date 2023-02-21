// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { UpdateEmailDto } from "@/prisma/dto/email/dto/update-email.dto";
import { Email } from "@/prisma/dto/email/entities/email.entity";
import { PrismaClient } from "@prisma/client";
import { log } from "console";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Email[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const data = req.body as Email;
    const email = await prisma.email.findMany({
      where: { email: data.email },
      include: {
        User: {
          include: {
            email: true,
            ResponsableSite: true,
          },
        },
      },
    });
    return res.status(200).json(email);
  }
  //   res.status(200).json({ name: "John Doe" });
}
