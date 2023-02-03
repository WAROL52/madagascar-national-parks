/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Formulaire1 from "./components/Formulaire1";
import Formulaire2 from "./components/Formulaire2";
import Formulaire3 from "./components/Formulaire3";
import Formulaire4 from "./components/Formulaire4";
import Formulaire5 from "./components/Formulaire5";
const formulaireList = [
  {
    title: "Identité du plaingnant",
    Formulaire: Formulaire1,
  },
  {
    title: "Réception de la plainte et dates importantes",
    Formulaire: Formulaire2,
  },
  {
    title: "Détails de la plainte sur la qualité de service",
    Formulaire: Formulaire3,
  },
  {
    title: "Motifs de la plainte",
    Formulaire: Formulaire4,
  },
  {
    title: "Récapitulatif",
    Formulaire: Formulaire5,
  },
];
function UncontrolledExample() {
  const [indexCarousel, setIndex] = useState(0);
  const increment = () => {
    const index = indexCarousel + 1;
    if (index < formulaireList.length) {
      setIndex(index);
    }
  };
  const decrement = () => {
    const index = indexCarousel - 1;
    if (index >= 0) {
      setIndex(index);
    }
  };
  return (
    <div className="container my-3 p-3 shadow text-bg-warning">
      <form id="form-plainte" action="/plainte" method="post">
        <section
          className="splide shadow p-0 rounded splide--slide splide--ltr is-active is-overflow is-initialized"
          aria-label="Splide Basic HTML Example"
          id="splide01"
          aria-roledescription="carousel"
        >
          <div className="splide__arrows your-class-arrows splide__arrows--ltr">
            <button
              className="splide__arrow your-class-arrow invisible"
              type="button"
              disabled
              aria-label="Previous slide"
              aria-controls="splide01-track"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width={40}
                height={40}
                focusable="false"
              >
                <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z" />
              </svg>
            </button>
            <button
              className="splide__arrow your-class-arrow invisible"
              type="button"
              aria-label="Next slide"
              aria-controls="splide01-track"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                width={40}
                height={40}
                focusable="false"
              >
                <path d="m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z" />
              </svg>
            </button>
          </div>
          <div
            className="splide__track splide__track--slide splide__track--ltr"
            id="splide01-track"
            style={{ paddingLeft: 0, paddingRight: 0 }}
            aria-live="polite"
            aria-atomic="true"
          >
            <Carousel
              as={"ul"}
              controls={false}
              interval={null}
              activeIndex={indexCarousel}
            >
              {formulaireList.map((form, index) => (
                <Carousel.Item key={index}>
                  <FormulaireItem title={form.title}>
                    <form.Formulaire />
                  </FormulaireItem>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="my-carousel-progress ">
            <div
              className="my-carousel-progress-bar"
              style={{ width: "20%" }}
            />
          </div>
        </section>
        <div className="container my-4 text-end">
          <button
            onClick={decrement}
            type="button"
            id="prev"
            className="btn btn-light  shadow px-4"
            disabled={indexCarousel <= 0}
          >
            <span className="icon text-dark-50 mr-2">
              <i className="fas fa-arrow-left" />
            </span>
            <span className="text">Précédant</span>
          </button>
          <button
            onClick={increment}
            disabled={indexCarousel + 1 >= formulaireList.length}
            type="button"
            id="next"
            className="btn btn-light  shadow px-4"
          >
            <span className="text">Suivant</span>
            <span className="icon text-dark-50 ml-2">
              <i className="fas fa-arrow-right" />
            </span>
          </button>
        </div>
        <div className="text-center">
          <button
            type="submit"
            id="btnsend"
            className="btn btn-primary shadow px-5"
            role="button"
            disabled
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
}

export default UncontrolledExample;

const FormulaireItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <li
      className="splide__slide container p-0 is-active is-visible"
      id="splide01-slide01"
      role="tabpanel"
      aria-roledescription="slide"
      aria-label="1 of 5"
      style={{ width: "calc(100%)" }}
    >
      <div className="mb-3 shadow text-bg-light p-3 border rounded">
        <h3 className="text-center">{title}</h3>
      </div>
      {children}
    </li>
  );
};
