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
  const ress = await prisma.user.findMany();
  if (req.method == "POST") {
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
    return res.status(200).json({
      hasError: true,
      title: "Email non valide!",
      type: 1,
      description:
        "L'adresse e-mail que vous avez utilisée n'est pas autorisée à s'enregistrer sur cette plate-forme.",
    });
  }
  console.log("elseee");
  return res.status(200).json(ress);
}
