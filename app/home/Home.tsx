/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeHeader from "./components/HomeHeader";
import HomeSlide from "./components/HomeSlide";
import MenuNav from "./MenuNav";

export default function AppHome() {
  return (
    <>
      <HomeSlide />
      <HomeHeader />
    </>
  );
}
