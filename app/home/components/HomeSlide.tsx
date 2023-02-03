"use client";
import React from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Image from "next/image";
// Default theme
// import "@splidejs/react-splide/css";

// // or other themes
// import '@splidejs/react-splide/css/skyblue';
// import '@splidejs/react-splide/css/sea-green';

// // or only core styles
// import '@splidejs/react-splide/css/core';
const imagesGalerie = [
  "andasibe - analamazaotra.jpg",
  "andohahela (1).jpg",
  "ankarafantsika.jpg",
  "ankarana.jpg",
  "bemaraha.jpg",
  "IMG_8553.jpg",
  "isalo.jpg",
  "macc.jpg",
  "Masoala.jpg",
  "montagne d ambre.jpg",
  "nosy hara.jpg",
  "nosy tanihely.jpg",
  "nosy-tanihely.jpg",
  "Photo 161.jpg",
  "ranomafana.jpg",
];
const RenderSlide = () => (
  <>
    {imagesGalerie.map((img, index) => (
      <SplideSlide key={index}>
        <img
          width={"100%"}
          src={`/images/galerie/${img}`}
          alt="Image galerie"
        />
      </SplideSlide>
    ))}
  </>
);
export default function HomeSlide() {
  return (
    <>
      <Splide
        options={{
          rewind: true,
          type: "loop",
          autoplay: true,
          interval: 3000,
        }}
        hasTrack={false}
        aria-label="..."
      >
        <SplideTrack>
          <RenderSlide />
        </SplideTrack>
        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev">Prev</button>
          <button className="splide__arrow splide__arrow--next">Next</button>
        </div>
      </Splide>
    </>
  );
}
