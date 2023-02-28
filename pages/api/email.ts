// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const users = await prisma.email.findMany({
    include: {
      User: {
        include: {
          email: true,
        },
      },
    },
  });
  return res.json(users);
}
