/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeCarousel from "./components/HomeCarousel";
import HomeHeader from "./components/HomeHeader";
import MenuNav from "./MenuNav";

export default function AppHome() {
  return (
    <>
      <HomeCarousel />
      <HomeHeader />
    </>
  );
}
