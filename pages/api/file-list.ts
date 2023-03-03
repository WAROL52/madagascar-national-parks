// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleDriveService } from "@/tools/googleDriveService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await GoogleDriveService.getListFile();
  console.log(
    "[GoogleDriveService]:getListFile",
    result.statusText,
    result.data
  );
  return res.status(200).json(result.data);
}
