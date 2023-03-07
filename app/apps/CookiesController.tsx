"use client";
import { getUserCookiesClient } from "@/tools/authClient";
import React from "react";

export default function CookiesController() {
  const user = getUserCookiesClient();
  if (user) {
  }
  return <></>;
}
