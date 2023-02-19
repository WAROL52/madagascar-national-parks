"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import React from "react";
type MenuType = {
  url: string;
  title: string;
};
type ParamsType = {
  id: string;
};
export default function MenuOfUser({
  menu,
  params,
}: {
  menu: MenuType;
  params: ParamsType;
}) {
  const segment = useSelectedLayoutSegment();
  return (
    <Link
      className={`btn btn-sm btn-color-gray-600 bg-state-body btn-active-warning fw-bolder fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-4 mx-1  
                    ${segment == menu.url ? "active" : ""}`}
      href={`/apps/user/${params.id}/${menu.url}`}
    >
      {menu.title}
    </Link>
  );
}
