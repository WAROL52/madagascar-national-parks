// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const folders = await prisma.folder.findUnique({
    where: { folderPathName: "/" },
    include: {
      folderChilds: true,
      File: true,
      folderParent: true,
    },
  });

  res.status(200).json(folders);
}
