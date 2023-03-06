// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleDriveService } from "@/tools/googleDriveService";
import { createReadStream } from "node:fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data = req.body as { googleDriveID: string };
    console.log("---------");

    const result = await GoogleDriveService.getFile(data.googleDriveID);
    const dataG = result.data;
    // const downloadUrl = URL.createObjectURL(
    //   new Blob([dataG], { type: dataG.mimeType })
    // );
    console.log(
      "[GoogleDriveService]:getFile",
      result.statusText,
      result.data.webContentLink
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${result.data.originalFilename}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");
    // createReadStream(dataG)
    return res.status(200).send(dataG.webContentLink);
  }
}
