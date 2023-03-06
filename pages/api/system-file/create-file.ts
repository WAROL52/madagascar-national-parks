// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Email } from "@/prisma/dto/email/entities/email.entity";
import { Folder } from "@/prisma/dto/folder/entities/folder.entity";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const data = req.body as {
      folderParent: Folder;
      file: {
        fileName: string;
        googleDriveID: string;
        type: string;
        downloadLink: string;
      };
    };
    let folderPathName = data.folderParent.folderPathName;
    if (folderPathName === "/") {
      folderPathName = "";
    }
    const responseData = await prisma.fileSchema.create({
      data: {
        fileName: data.file.fileName,
        fileNameSrc: data.file.googleDriveID,
        filePathName: folderPathName + "/" + data.file.fileName,
        googleDriveID: data.file.googleDriveID,
        type: data.file.type,
        downloadLink: data.file.downloadLink,
        folderParent: {
          connect: {
            folderPathName: data.folderParent.folderPathName,
          },
        },
      },
      include: {
        folderParent: {
          include: {
            fileChilds: true,
            folderChilds: true,
            folderParent: true,
          },
        },
      },
    });
    return res.status(200).json(responseData.folderParent);
  }
  //   res.status(200).json({ name: "John Doe" });
}
