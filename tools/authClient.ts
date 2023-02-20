"use client";
import { User } from "@/prisma/dto/user/entities/user.entity";
import Cookies from "js-cookie";

export function getUserCookiesClient() {
  const user = Cookies.get("user");
  if (user) {
    return JSON.parse(user) as User;
  }
  return null;
}
export function setUserCookiesClient(user: User) {
  Cookies.set("user", JSON.stringify(user));
}
