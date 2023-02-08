// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  console.log(req.body);
  try {
    await prisma.$connect();
    // const data = await prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    // log error
    console.log(error);
    console.error(JSON.stringify(error, null, 2));
  }
  if (req.body == "POST") {
    const { nom, prenom, email, motdepasse } = req.body;
    const emailAccepted = await prisma.email.findUnique({
      where: {
        email,
      },
    });
    if (emailAccepted) {
      if (await prisma.user.findUnique({ where: { email } })) {
        return res.status(200).json({
          hasError: true,
          type: 2,
          title: "Email déjà enregistré!",
          description:
            "Il semble que vous êtes déjà enregistré avec cet e-mail.",
        });
      }
      const user = await prisma.user.create({
        data: {
          email,
          motdepasse,
          nom,
          prenom,
        },
      });
      return res.status(200).json(user);
    }
    res.status(200).json({
      hasError: true,
      title: "Email non valide!",
      type: 1,
      description:
        "L'adresse e-mail que vous avez utilisée n'est pas autorisée à s'enregistrer sur cette plate-forme.",
    });
  }
  return await prisma.user.findMany();
}
