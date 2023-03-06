// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GLOBAL_VALUE } from "@/tools/configGlobal";
import { initDataBaseAdmin, initDataBaseExemple } from "@/tools/reinitiliser";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;
  if (req.method === "POST") {
    const data = req.body as { id: string };
    if (data.id === GLOBAL_VALUE.devID) {
      result = await initDataBaseAdmin();
    }
  }
  return res.status(200).json(result);
}
