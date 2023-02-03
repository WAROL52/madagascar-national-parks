import React from "react";

export default function page() {
  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0 border rounded-3">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block  text-bg-warning">
                  <img src="/images/belou.png" width="100%" alt="" srcSet="" />
                </div>
                <div className="col-lg-6 ">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Connexion</h1>
                    </div>
                    <form className="user" action="/login" method="post">
                      <div className="form-group mb-3 ">
                        <input
                          type="email"
                          required
                          name="email"
                          className="form-control p-2 border rounded-pill"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Entrer votre adresse e-mail..."
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="password"
                          required
                          name="motdepasse"
                          className="form-control p-2 border rounded-pill"
                          id="exampleInputPassword"
                          placeholder="Mot de passe"
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small mb-3">
                          <input
                            type="checkbox"
                            name="rememberMe"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Se souvenir de moi
                          </label>
                        </div>
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary border rounded-pill"
                          type="submit"
                        >
                          Se connecter
                        </button>
                      </div>
                      <hr />
                      <a href="#" className="btn btn-google btn-user btn-block">
                        <i className="fab fa-google fa-fw" /> Connectez-vous
                        avec Google
                      </a>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="/forgot-password">
                        Mot de passe oublié ?
                      </a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="/register">
                        Créer nouveau compte!
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
