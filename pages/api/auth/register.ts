// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ress = await prisma.user.findMany();

  if (req.method == "POST") {
    const { nom, prenom, email, motdepasse } = req.body;
    const emailAccepted = await prisma.email.findUnique({
      where: {
        email,
      },
      include: {
        User: true,
      },
    });
    // const isValid = await validate(email);
    // if (!isValid.valid) {
    //   return res.status(200).json({
    //     hasError: true,
    //     title: "Email non valide!",
    //     type: 1,
    //     description:
    //       "L'adresse e-mail que vous avez utilisée n'est pas autorisée à s'enregistrer sur cette plate-forme.",
    //   });
    // }
    if (emailAccepted) {
      if (emailAccepted.User) {
        return res.status(200).json({
          hasError: true,
          type: 2,
          title: "Email déjà enregistré!",
          description:
            "Il semble que vous êtes déjà enregistré avec cet e-mail.",
        });
      }
      const resEmail = await prisma.email.update({
        where: { email },
        data: {
          User: {
            create: {
              nom,
              prenom,
              motdepasse,
            },
          },
        },
      });
      return res.status(200).json(resEmail);
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
