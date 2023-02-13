/* eslint-disable react/no-unescaped-entities */
"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";

export default function NavTools() {
  const userCookies = Cookies.get("user") || "";
  const user = JSON.parse(userCookies || "{}");
  return (
    <>
      <div hidden={!!userCookies} className="col-md-3 text-end mx-5">
        <Link
          href="/login"
          type="button"
          className="btn btn-outline-primary me-2"
        >
          Se connecter
        </Link>
        <Link href="/register" type="button" className="btn btn-warning">
          S'inscrire
        </Link>
      </div>
      <div hidden={!userCookies} className="flex-shrink-0 dropdown  mx-5">
        <a
          href="#"
          className="d-block link-dark text-bg-light text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {user?.prenom}
          <img
            src="https://github.com/mdo.png"
            alt="mdo"
            width={32}
            height={32}
            className="rounded-circle"
          />
        </a>
        <ul className="dropdown-menu text-small shadow" style={{}}>
          <li>
            <a className="dropdown-item" href="#">
              Apps
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Parametre
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Se déconnecter
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
