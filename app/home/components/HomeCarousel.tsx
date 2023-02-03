"use client";
import Carousel from "react-bootstrap/Carousel";
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
export default function HomeCarousel() {
  return (
    <Carousel>
      {imagesGalerie.map((imgSrc, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`/images/galerie/${imgSrc}`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Lorem, ipsum dolor.</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
