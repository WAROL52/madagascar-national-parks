// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GLOBAL_VALUE } from "@/tools/configGlobal";
import {
  initDataBaseExemple,
  initDataBaseResponsableDeSite,
} from "@/tools/reinitiliser";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;
  if (req.method === "POST") {
    const data = req.body as { id: string };
    if (data.id === GLOBAL_VALUE.devID) {
      result = await initDataBaseResponsableDeSite();
    }
  }
  return res.status(200).json(result);
}
