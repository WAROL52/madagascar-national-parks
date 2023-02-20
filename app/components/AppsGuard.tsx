"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";
type UserType = Partial<{
  email: string;
  motdepasse: string;
  nom: string;
  prenom: string;
}>;
export default function AppsGuard() {
  const router = useRouter();
  const userCookies = Cookies.get("user") || "";
  const user = JSON.parse(userCookies || "{}") as UserType;
  console.log("AppsGuard:", user);

  if (!Object.keys(user).length) {
    router.push("/login");
  }
  return <></>;
}
