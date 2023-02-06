/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MenuNav from "./home/MenuNav";

export default function HeaderNav() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar border-bottom static-top shadow-sm ">
        {/* <!-- Topbar Search --> */}
        <div className="d-flex mx-3 flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0  text-decoration-none"
          >
            <Image src="/images/logo.png" width={40} height={58} alt="logo" />
          </Link>
        </div>
        <ul
          id="menu-nav-1"
          className="nav bg-transparent px-2 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
        >
          <MenuNav />
          <li>
            <a
              href="https://www.parcs-madagascar.com/"
              target="_blank"
              type="button"
              className="btn btn-light"
              rel="noreferrer"
            >
              Site officiel
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-box-arrow-up-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
        {/* <!-- Topbar Navbar --> */}

        <div className="col-md-3 text-end mx-5">
          <a
            href="/login"
            type="button"
            className="btn btn-outline-primary me-2"
          >
            Se connecter
          </a>
          <a href="/register" type="button" className="btn btn-warning">
            S'inscrire
          </a>
        </div>
      </nav>
    </>
  );
}
