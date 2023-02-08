import LiLink from "@/app/components/LiLink";
import Link from "next/link";
import React from "react";
const links = [
  {
    title: "Suivi de projet",
    url: "suivi-de-projet",
  },
  {
    title: "Gestion de plainte",
    url: "gestion-de-plainte",
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  const classNameValue =
    "btn btn-sm btn-color-gray-600 bg-state-body btn-active-color-gray-800 fw-bolder fw-bold fs-6 fs-lg-base nav-link px-3 px-lg-4 mx-1 ";
  return (
    <>
      <div
        id="kt_user_profile_nav"
        className="rounded bg-gray-200 d-flex flex-stack flex-wrap mb-9 p-2"
      >
        <ul className="nav flex-wrap border-transparent">
          {links.map((link, index) => (
            <LiLink key={index} url={"/apps/admin/gestion-site/" + link.url}>
              {" "}
              {link.title}{" "}
            </LiLink>
          ))}
        </ul>
      </div>
      <div className="p-5 row g-5 g-xl-10 mb-5 mb-xl-10">{children}</div>
    </>
  );
}
