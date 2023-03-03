// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleDriveService } from "@/tools/googleDriveService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const data = req.body as { fileId: string };
    const result = await GoogleDriveService.getFile(data.fileId);
    console.log("[GoogleDriveService]:getFile", result.statusText, result.data);
    return res.status(200).json(result.data);
  }
}
