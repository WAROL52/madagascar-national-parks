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
    const data = req.body as {
      folderName: string;
      folderPathName: string;
      folderParentPathName: string;
    };
    const responseData = await prisma.folder.create({
      data: {
        folderName: data.folderName,
        folderPathName: data.folderPathName,
        folderParent: {
          connect: {
            folderPathName: data.folderParentPathName,
          },
        },
      },
    });
    const folderParent = await prisma.folder.findUnique({
      where: {
        folderPathName: data.folderParentPathName,
      },
      include: {
        File: true,
        folderChilds: true,
        folderParent: true,
      },
    });
    return res.status(200).json(folderParent);
  }
  //   res.status(200).json({ name: "John Doe" });
}
