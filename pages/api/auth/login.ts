// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ress = await prisma.user.findMany();

  if (req.method == "POST") {
    const { email, motdepasse } = req.body;
    const emailAccepted = await prisma.email.findUnique({
      where: {
        email,
      },
      include: {
        User: {
          include: {
            email: true,
            ResponsableSite: true,
          },
        },
      },
    });
    if (emailAccepted) {
      if (emailAccepted.User) {
        if (emailAccepted.User.motdepasse === motdepasse) {
          return res.status(200).json(emailAccepted.User);
        }
        return res.status(200).json({
          hasError: true,
          type: 2,
          title: "Email déjà enregistré!",
          description:
            "Il semble que vous êtes déjà enregistré avec cet e-mail.",
        });
      }
      return res.status(200).json({
        hasError: true,
        type: 2,
        title: "Email pas encore inscrit!",
        description: "Inscrivez vous avant de se connecter",
      });
    }
    return res.status(200).json({
      hasError: true,
      title: "Email ou Mots de passe non valide!",
      type: 1,
      description:
        "L'adresse e-mail ou le mots de passe que vous avez utilisée n'est pas valide",
    });
  }
  return res.status(200).json(ress);
}
