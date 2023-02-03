/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function Formulaire3() {
  return (
    <div
      className="shadow text-bg-light p-3 border rounded overflow-auto"
      style={{ height: 500 }}
    >
      <div className="mb-3">
        <figure>
          <blockquote className="blockquote">
            <p>Version des faits detaillée du client</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            Prendre toute l'espace nécessaire, chronologie des evenements, noms
            des personnes impliquées, etc...
          </figcaption>
        </figure>
        <textarea
          name="version_des_faits_detaillee_du_client"
          className="form-controlle"
          cols={100}
          rows={1}
          tabIndex={-1}
          defaultValue={""}
        />
      </div>
      <div className="mb-3">
        <figure>
          <blockquote className="blockquote">
            <p>Unités administratives</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            Prendre toute l'espace nécessaire
          </figcaption>
        </figure>
        <textarea
          name="ua"
          className="form-controlle"
          cols={100}
          rows={4}
          tabIndex={-1}
          defaultValue={""}
        />
      </div>
      <figure>
        <blockquote className="blockquote">
          <p>Catégories d'emploi visées par la plainte</p>
        </blockquote>
        <figcaption className="blockquote-footer">
          Cocher plus d'un, s'il y a lieu
        </figcaption>
      </figure>
      <div className="mb-3 row">
        <div className="col">
          <input
            type="checkbox"
            name="unites_administratives_et_categories_demploi_visees_par_la_plainte.prepose_aux_renseignements"
            id="prepose_aux_renseignements"
            tabIndex={-1}
          />
          <label htmlFor="prepose_aux_renseignements">
            Préposé aux renseignements
          </label>
        </div>
        <div className="col-2">
          <input
            type="checkbox"
            name="unites_administratives_et_categories_demploi_visees_par_la_plainte.mediateur"
            id="mediateur"
            tabIndex={-1}
          />
          <label htmlFor="mediateur">Médiateur</label>
        </div>
        <div className="col">
          <input
            type="checkbox"
            name="unites_administratives_et_categories_demploi_visees_par_la_plainte.inspecteur_enqueteur"
            id="inspecteur_enqueteur"
            tabIndex={-1}
          />
          <label htmlFor="inspecteur_enqueteur">Inspecteur - enqueteur</label>
        </div>
        <div className="col ">
          <input
            type="checkbox"
            name="unites_administratives_et_categories_demploi_visees_par_la_plainte.prepose_aux_renseignements"
            id="prepose_aux_renseignements"
            tabIndex={-1}
          />
          <label htmlFor="prepose_aux_renseignements" className="wrap">
            Préposé aux renseignements
          </label>
        </div>
        <div className="col-2">
          <input
            type="checkbox"
            name="unites_administratives_et_categories_demploi_visees_par_la_plainte.avocat"
            id="avocat"
            tabIndex={-1}
          />
          <label htmlFor="avocat">Avocat</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="unites_administratives_et_categories_demploi_visees_par_la_plainte.autre"
            id="details_autre"
            tabIndex={-1}
          />
          <label htmlFor="details_autre">
            Autre :{" "}
            <input
              type="text"
              className="form-controlle"
              name="unites_administratives_et_categories_demploi_visees_par_la_plainte.autre_input"
              tabIndex={-1}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
