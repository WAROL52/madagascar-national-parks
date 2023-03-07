"use client";

import { getUserCookiesClient } from "@/tools/authClient";
import { SiteName } from "@prisma/client";
import TableOfOneProjet from "./TableOfOneProjet/TableOfOneProjet";

export default function TableFormation() {
  const user = getUserCookiesClient();
  if (!user) {
    return "";
  }
  const siteNames = user.email.siteName.split("_") as SiteName[];
  console.log(siteNames);
  return (
    <>
      {siteNames.map((siteName, index) => (
        <TableOfOneProjet
          key={index}
          projetName="formation"
          siteName={siteName}
        />
      ))}
    </>
  );
}
