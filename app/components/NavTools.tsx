/* eslint-disable react/no-unescaped-entities */
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
type UserType = Partial<{
  email: string;
  motdepasse: string;
  nom: string;
  prenom: string;
  id: number;
}>;
export default function NavTools() {
  const Cookies = cookies();
  const userCookies = Cookies.get("user")?.value || "";
  const user = JSON.parse(userCookies || "{}") as UserType;
  console.log("navvv", user);

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
          className="d-block link-dark text-bg-light text-decoration-none dropdown-toggle mx-5"
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
            <Link className="dropdown-item" href="/apps">
              Apps
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              href={`/apps/user/${user.id}/parametres`}
            >
              Paramètre
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              href={`/apps/user/${user.id}/apercue`}
            >
              Profile
            </Link>
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
