"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import SessionController from "./SessionController";

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <SessionController>{children}</SessionController>
      </SessionProvider>
    </>
  );
}
