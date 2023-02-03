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
                        Mot de passe oublié?
                      </h1>
                      <p className="mb-4">
                        Entrez simplement votre adresse e-mail ci-dessous et
                        nous vous enverrons un lien pour réinitialiser votre mot
                        de passe!
                      </p>
                    </div>
                    <form
                      className="user"
                      action="/forgot-password"
                      method="post"
                    >
                      <div className="form-group mb-3">
                        <input
                          type="email"
                          name="email"
                          className="form-control border rounded-pill"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Entrer votre adresse e-mail..."
                        />
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary border rounded-pill"
                          type="submit"
                        >
                          Réinitialiser le mot de passe
                        </button>
                      </div>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="/register">
                        Créer un compte!
                      </a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="/login">
                        Vous avez déjà un compte? Connexion!
                      </a>
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
