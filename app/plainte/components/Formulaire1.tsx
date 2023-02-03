/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function Formulaire1() {
  return (
    <div
      className="shadow text-bg-light p-3 border rounded overflow-auto"
      style={{ height: 500 }}
    >
      <div className="row mb-4">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Nom
          </label>
          <input
            type="text"
            name="nom"
            className="form-control form-plainte"
            id="exampleFormControlInput1"
            placeholder="  Votre nom..."
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Prenom
          </label>
          <input
            type="text"
            name="prenom"
            className="form-control form-plainte"
            id="exampleFormControlInput1"
            placeholder=" Votre prenom..."
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Adresse
          </label>
          <input
            type="text"
            name="adresse"
            className="form-control form-plainte"
            id="exampleFormControlInput1"
            placeholder="Votre adresse..."
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            CIN
          </label>
          <input
            type="text"
            name="cin"
            minLength={12}
            maxLength={12}
            className="form-control form-plainte"
            id="exampleFormControlInput1"
            placeholder="Votre CIN..."
          />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-6 col-sm-12">
          <label htmlFor="phone" className="form-label">
            Télephone
          </label>
          <br />
        </div>
        <div className="col-md-6 col-sm-12">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control form-plainte"
            placeholder="Votre e-mail..."
            aria-label="Server"
          />
        </div>
      </div>
      <div>
        <h6>Type de plaignant :</h6>
        <div className=" container row">
          <div className="col-md-6 col-sm-12">
            <input
              className="form-control form-plainte"
              name="type_de_plaignant"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Type to search..."
            />
            <datalist id="datalistOptions">
              <option value="Salarié"></option>
              <option value="Employeur (ou on représentant)"></option>
              <option value="Travailleur autonome"></option>
              <option value="Citoyen"></option>
              <option value="Collaborateur de la CNT"></option>
            </datalist>
          </div>
        </div>
      </div>
      <div>
        <h4>
          Services CNT sollicité par le plaignant
          <span className="text-secondary">
            (cochez plus d'un, s'il y a lieu)
          </span>
          :
        </h4>
        <div className="container px-3">
          <div className="row">
            <div className="col">
              <input
                type="checkbox"
                defaultValue="PL PEC"
                required
                name="services_CNT_sollicite_par_le_plaignant.plpec"
                id="plpec"
              />
              <label htmlFor="plpec">PL PEC</label>
            </div>
            <div className="col">
              <input
                type="checkbox"
                required
                name="services_CNT_sollicite_par_le_plaignant.pl124"
                id="pl124"
                defaultValue="PL 124"
              />
              <label htmlFor="pl124">PL 124</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="checkbox"
                required
                name="services_CNT_sollicite_par_le_plaignant.demande_renseignements"
                id="demande_renseignements"
                defaultValue="Demande de
          renseignements"
              />
              <label htmlFor="demande_renseignements">
                Demande de renseignements
              </label>
            </div>
            <div className="col">
              <input
                type="checkbox"
                required
                name="services_CNT_sollicite_par_le_plaignant.seance_information"
                id="seance_information"
                defaultValue="Séance d'information"
              />
              <label htmlFor="seance_information">Séance d'information</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="checkbox"
                required
                name="services_CNT_sollicite_par_le_plaignant.pl122"
                id="pl122"
                defaultValue="PL 122"
              />
              <label htmlFor="pl122">PL 122</label>
            </div>
            <div className="col">
              <input
                type="checkbox"
                required
                name="services_CNT_sollicite_par_le_plaignant.plhp"
                id="plhp"
                defaultValue="PL HP"
              />
              <label htmlFor="plhp">PL HP</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="checkbox"
                required
                name="services_CNT_sollicite_par_le_plaignant.surveillance_loi"
                id="surveillance_loi"
                defaultValue="Surveillance de l'application de la
          loi"
              />
              <label htmlFor="surveillance_loi">
                Surveillance de l'application de la loi
              </label>
            </div>
            <div className="col">
              <input
                type="checkbox"
                required
                name="services_CNT_sollicite_par_le_plaignant.service_autre"
                id="service_autre"
              />
              <label htmlFor="service_autre">
                Autre :{" "}
                <input
                  name="services_CNT_sollicite_par_le_plaignant.autre"
                  type="text"
                />
              </label>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
