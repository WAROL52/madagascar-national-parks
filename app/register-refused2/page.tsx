import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block text-bg-warning">
                  <img src="/images/belou.png" width="100%" alt="" srcSet="" />
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-2">
                        Email déjà enregistré!
                      </h1>
                      <p className="mb-4">
                        Il semble que vous êtes déjà enregistré avec cet e-mail.
                      </p>
                    </div>
                    <hr />
                    <div className="text-center">
                      <Link className="small" href="/register">
                        Créer un compte!
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" href="/login">
                        Vous avez déjà un compte? Connexion!
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" href="/forgot-password">
                        Mot de passe oublié ?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
