"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function LiLink({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const classNameValue =
    "btn btn-sm btn-color-gray-600 bg-state-body btn-active-color-gray-800 fw-bolder fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-4 mx-1 ";
  return (
    <li className="nav-item my-1">
      <Link className={classNameValue + (path === url && "active")} href={url}>
        {children}
      </Link>
    </li>
  );
}
