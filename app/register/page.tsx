/* eslint-disable react/no-unescaped-entities */
import React from "react";

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
                <form
                  className="user needs-validation  "
                  action="/register"
                  method="post"
                >
                  <div className="form-group row mb-3">
                    <div className="col-sm-6  mb-sm-0">
                      <input
                        type="text"
                        minLength={2}
                        required
                        name="nom"
                        className="form-control  border rounded-pill"
                        id="exampleFirstName"
                        placeholder="Nom"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        minLength={2}
                        required
                        name="prenom"
                        className="form-control border rounded-pill"
                        id="exampleLastName"
                        placeholder="Prenom"
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="email"
                      required
                      name="email"
                      className="form-control border rounded-pill"
                      id="exampleInputEmail"
                      placeholder="Adresse e-mail"
                    />
                  </div>
                  <div
                    className="form-group row mb-3"
                    x-data="{motdepasse1:'',motdepasse2:''}"
                  >
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="password"
                        required
                        name="motdepasse1"
                        minLength={6}
                        className="form-control border rounded-pill"
                        id="exampleInputPassword"
                        placeholder="Mot de passe"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="password"
                        name="motdepasse2"
                        required
                        minLength={6}
                        className="form-control border rounded-pill"
                        id="exampleRepeatPassword"
                        placeholder="Répéter le mot de passe"
                      />
                      <div className="invalid-feedback">
                        mots de passe ne correspondent pas
                      </div>
                    </div>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary border rounded-pill"
                      type="submit"
                    >
                      Créer un compte
                    </button>
                  </div>
                  <hr />
                  <a href="#" className="btn btn-google btn-user btn-block">
                    <i className="fab fa-google fa-fw" />
                    S'inscrire avec un compte Google
                  </a>
                </form>
                <hr />
                <div className="text-center">
                  <a className="small" href="/forgot-password">
                    Mot de passe oublié?
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
  );
}
