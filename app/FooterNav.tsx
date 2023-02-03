import React from "react";

export default function FooterNav() {
  return (
    <footer
      className="text-center  text-lg-start text-white"
      style={{ backgroundColor: " #929fba" }}
    >
      {/* <!-- Grid container --> */}
      <div className="container p-4 pb-0">
        {/* <!-- Section: Links --> */}
        <section className="text-dark">
          {/* <!--Grid row--> */}
          <div className="row">
            {/* <!-- Grid column --> */}
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Madagascar National Parks
              </h6>
              <img
                className="m-0 p-0"
                src="/images/belou.png"
                alt=""
                style={{ width: "100%", position: "relative" }}
              />
            </div>

            {/* <!-- Grid column --> */}

            <hr className="w-100 clearfix d-md-none" />

            {/* <!-- Grid column --> */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p>
                <a className="btn btn-link" href="mailto:contact@mnparks.mg">
                  contact@mnparks.mg
                </a>
              </p>
              <p>
                <a href="mailto:info@madagascar.national.parks.mg">
                  info@madagascar.national.parks.mg
                </a>
              </p>
              <div>
                <img src="/images/telephone.svg" alt="" srcSet="" /> 020 26 408
                68 / 69
              </div>
              <div>
                <img src="/images/telephone.svg" alt="" srcSet="" />{" "}
                <a href="tel:+261320940010">+261 32 09 400 10</a>
              </div>
            </div>

            {/* <!-- Grid column --> */}

            <hr className="w-100 clearfix d-md-none" />

            {/* <!-- Grid column --> */}
            <hr className="w-100 clearfix d-md-none" />

            {/* <!-- Grid column --> */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Adresse:</h6>
              <p>
                Madagascar National Parks, BP. 1424 - Ambatobe, 103
                Antananarivo, Madagascar
              </p>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d30199.43543656452!2d47.53975165!3d-18.89021165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2sMadagascar%20National%20Parks!5e0!3m2!1sfr!2smg!4v1669636707798!5m2!1sfr!2smg"
                  width="300"
                  height="200"
                  style={{ border: "0" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">
                Suivez-nous sur:
              </h6>

              {/* <!-- Facebook --> */}
              <a
                className="btn btn-floating m-1"
                href="https://www.facebook.com/madagascarnationalparks/"
                target="_blank"
                role="button"
                rel="noreferrer"
              >
                <img src="/images/facebook.svg" alt="" srcSet="" />
              </a>

              {/* <!-- Twitter --> */}
              <a
                className="btn btn-floating m-1"
                href="https://twitter.com/ParksMadagascar"
                target="_blank"
                role="button"
                rel="noreferrer"
              >
                <img src="/images/twitter.svg" alt="" srcSet="" />
              </a>

              {/* <!-- Google --> */}
              <a
                className="btn btn-floating m-1"
                href="https://www.instagram.com/explore/tags/madagascarnationalparks/"
                target="_blank"
                role="button"
                rel="noreferrer"
              >
                <img src="/images/instagram.svg" alt="" srcSet="" />
              </a>

              {/* <!-- Instagram --> */}
              <a
                className="btn btn-floating m-1"
                href="https://www.youtube.com/channel/UC6AmIfYIQoPKF94TsSxHQFQ"
                target="_blank"
                role="button"
                rel="noreferrer"
              >
                <img src="/images/youtube.svg" alt="" srcSet="" />
              </a>

              {/* <!-- Linkedin --> */}
              <a
                className="btn btn-floating m-1"
                href="https://www.linkedin.com/company/madagascar-national-parks/"
                target="_blank"
                role="button"
                rel="noreferrer"
              >
                <img src="/images/linkedin.svg" alt="" srcSet="" />
              </a>
            </div>
          </div>

          {/* <!--Grid row--> */}
        </section>

        {/* <!-- Section: Links --> */}
      </div>

      {/* <!-- Grid container --> */}

      {/* <!-- Copyright --> */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: " rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Madagascar National Parks
      </div>

      {/* <!-- Copyright --> */}
    </footer>
  );
}
