"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogoutUser() {
  const router = useRouter();
  const handlerLogout = () => {
    Cookies.remove("user");
    router.push("/login");
  };
  return (
    <a className="dropdown-item" href="#" onClick={handlerLogout}>
      Se déconnecter
    </a>
  );
}
