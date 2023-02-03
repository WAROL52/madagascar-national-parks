/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function Formulaire4() {
  return (
    <div
      className="shadow text-bg-light p-3 border rounded overflow-auto"
      style={{ height: 500 }}
    >
      <div className="container row">
        <div className="form-check">
          <input
            className="form-check-input"
            name="motifs_de_la_plainte.0"
            type="checkbox"
            defaultValue=" Délai de traitement "
            id="flexCheckDefault1"
            tabIndex={-1}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault1">
            1 . Délai de traitement
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="motifs_de_la_plainte.1"
            type="checkbox"
            defaultValue="Politesse, courtoisie, tact "
            id="flexCheckDefault2"
            tabIndex={-1}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault2">
            2 . Politesse, courtoisie, tact
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="motifs_de_la_plainte.2"
            type="checkbox"
            defaultValue="Serviabilité, eoute, sens du service à la clientèle "
            id="flexCheckDefault3"
            tabIndex={-1}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault3">
            3 . Serviabilité, eoute, sens du service à la clientèle
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="motifs_de_la_plainte.3"
            type="checkbox"
            defaultValue="Exactitude, clarté et uniforme de l'information "
            id="flexCheckDefault4"
            tabIndex={-1}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault4">
            4 . Exactitude, clarté et uniforme de l'information
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="motifs_de_la_plainte.4"
            type="checkbox"
            defaultValue="suivi et retours d'appels "
            id="flexCheckDefault5"
            tabIndex={-1}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault5">
            5 . suivi et retours d'appels
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="motifs_de_la_plainte.5"
            type="checkbox"
            defaultValue="Protection confidentialité et renseignement personnels "
            id="flexCheckDefault6"
            tabIndex={-1}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault6">
            6 . Protection confidentialité et renseignement personnels
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            name="motifs_de_la_plainte.autre"
            type="checkbox"
            id="flexCheckChecked6"
            tabIndex={-1}
          />
          <label className="form-check-label" htmlFor="flexCheckChecked6">
            Autre :{" "}
            <input
              type="text"
              name="motifs_de_la_plainte.autre.value"
              className="form-controlle"
              tabIndex={-1}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
