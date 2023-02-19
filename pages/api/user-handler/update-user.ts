// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UpdateUserDto } from "@/prisma/dto/user/dto/update-user.dto";
import { User } from "@/prisma/dto/user/entities/user.entity";
import { PrismaClient } from "@prisma/client";
import { log } from "console";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();
type Data = User;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("req--->", req.method);
  console.log(req.body);
  if (req.method == "POST") {
    const data = req.body as UpdateUserDto & { id: number };
    const id = data[`id`] as number;
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return res.status(200).json(user);
  }
  //   res.status(200).json();
}
