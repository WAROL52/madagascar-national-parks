"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
export type LinkType = {
  url: string;
  title: string;
  icon?: () => React.ReactElement;
};
export type MenuNavType = LinkType[];
const menuNavs: MenuNavType = [
  {
    title: "Accueil",
    url: "",
  },
  {
    title: "Deposer une Plainte",
    url: "plainte",
  },
  {
    title: "Progression des Plaintes",
    url: "progression-plainte",
  },
];
export default function MenuNav() {
  const pathname = usePathname();
  const titleActived = pathname?.split("/")[1];
  console.log("MenuNav:", titleActived);

  return (
    <>
      {menuNavs.map((menu, index) => (
        <li key={index}>
          <Link
            href={menu.url}
            className={`btn btn-light px-2 ${
              menu.url == titleActived && "active"
            } `}
          >
            {menu.title}
          </Link>
        </li>
      ))}
    </>
  );
}
