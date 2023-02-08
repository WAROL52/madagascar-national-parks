/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";
import FormRegister from "./FormRegister";
export default function page() {
  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block text-bg-warning">
              <img src="/images/belou.png" width="100%" alt="" srcSet="" />
            </div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Créer un compte!</h1>
                </div>
                <FormRegister />
                <hr />
                <div className="text-center">
                  <Link className="small" href="/forgot-password">
                    Mot de passe oublié?
                  </Link>
                </div>
                <div className="text-center">
                  <Link className="small" href="/login">
                    Vous avez déjà un compte? Connexion!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
