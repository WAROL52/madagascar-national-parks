/* eslint-disable react/no-unescaped-entities */
import { getUserCookiesServer } from "@/tools/authServer";
import { getAvatarUser } from "@/tools/tools";
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
  const user = getUserCookiesServer();
  if (user) {
    const imgSrc = getAvatarUser(user.avatar, user.sexe);

    return (
      <div className="flex-shrink-0 dropdown  mx-5">
        <a
          href="#"
          className="d-block link-dark text-bg-light text-decoration-none dropdown-toggle mx-5"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {user?.prenom}
          <img
            src={imgSrc}
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
    );
  }
  return (
    <>
      <div className="col-md-3 text-end mx-5">
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
    </>
  );
}
