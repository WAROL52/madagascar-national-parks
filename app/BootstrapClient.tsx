"use client";
import React from "react";
import { useEffect } from "react";
export default function BootstrapClient({
  children,
}: {
  children?: React.ReactNode;
}) {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return <>{children}</>;
}
