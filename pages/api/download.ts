// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleDriveService } from "@/tools/googleDriveService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data = req.body as { fileId: string };
    console.log("---------");

    const result = await GoogleDriveService.getFile(
      "1gMBmSonsPdaYOG_DvdyevVZl42hxksad" || data.fileId
    );
    const dataG = result.data
    // const downloadUrl = URL.createObjectURL(
    //   new Blob([dataG], { type: dataG.mimeType })
    // );
    console.log("[GoogleDriveService]:getFile", result.statusText, result.data);
    return res.status(200).json(dataG);
  }
}
