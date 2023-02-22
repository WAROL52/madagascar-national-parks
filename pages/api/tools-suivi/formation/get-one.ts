// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Email } from "@/prisma/dto/email/entities/email.entity";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const data = req.body as Email;
    const responseData = await prisma.suiviFormation.findMany({
      where: { siteName: data.siteName },
      include: {
        Responsables: true,
      },
    });
    return res.status(200).json(responseData);
  }
  //   res.status(200).json({ name: "John Doe" });
}
