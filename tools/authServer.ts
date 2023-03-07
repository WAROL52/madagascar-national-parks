import { cookies } from "next/headers";
import { User } from "@/prisma/dto/user/entities/user.entity";
import { NextResponse } from "next/server";
export function getUserCookiesServer(): User | null {
  const cookie = cookies().get("user");
  const user = cookie && cookies().get("user").value;
  if (!user) return null;
  try {
    return JSON.parse(user) as User;
  } catch (error) {
    return null;
  }
}
export function setUserCookiesServer(user: User) {
  // cookies().delete("user");
  // Given incoming request /home
  // let response = NextResponse.next();
  // Set a cookie to hide the banner
  // response.cookies.set("user", JSON.stringify(user));
  // cookies().set("user", JSON.stringify(user));
}
