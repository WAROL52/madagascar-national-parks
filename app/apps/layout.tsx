/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./styles.css";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { AppsMenu } from "./AppsMenu";
import Link from "next/link";
import AppsGuard from "../components/AppsGuard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserCookiesServer, setUserCookiesServer } from "@/tools/authServer";
import { PrismaClient } from "@prisma/client";
import SideBar from "./SideBar";
type UserType = Partial<{
  email: string;
  motdepasse: string;
  nom: string;
  prenom: string;
}>;
export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const Cookies = cookies();
  // const userCookies = Cookies.get("user")?.value || "";
  // const user = JSON.parse(userCookies || "{}") as UserType;
  const user = getUserCookiesServer();

  if (!user) {
    redirect("/login");
  }
  if (user.id) {
    const prisma = new PrismaClient();
    const USERDATA = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!USERDATA) {
      console.log("Apps.layout:redirect", USERDATA);
      redirect("/login");
    }
  }

  return (
    <>
      <div id="layoutSidenav">
        <SideBar />

        <div id="layoutSidenav_content">
          <main>
            <div
              className="container-fluid px-4"
              style={{ height: "100%", width: "100%" }}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
