import { cookies } from "next/headers";
import { User } from "@/prisma/dto/user/entities/user.entity";
export function getUserCookiesServer(): User | null {
  const cookie = cookies().get("user");
  const user = cookie && cookies().get("user").value;
  console.log(
    "getUserCookiesServer:-----------------------------------------------------------"
  );
  console.log(user);

  console.log("-----------------------------------------------------------");

  if (!user) return null;
  try {
    return JSON.parse(user) as User;
  } catch (error) {
    return null;
  }
}
export function setUserCookiesServer(user: User) {
  cookies().delete("user");
  cookies().set("user", JSON.stringify(user));
}
