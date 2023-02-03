/* eslint-disable react/no-unescaped-entities */
import React from "react";

export default function Formulaire5() {
  return (
    <div
      id="recapitulatif"
      className="shadow text-bg-light p-3 border rounded overflow-auto"
      style={{ height: 500 }}
    >
      <div className="row mb-3">
        <h5 className="text-bg-secondary border rounded link">
          Identité du plaignant :
        </h5>
        <div>
          <span className="h6">Nom:</span>
        </div>
        <div>
          <span className="h6">Prenom:</span>
        </div>
        <div>
          <span className="h6">Télephone:</span>
        </div>
        <div>
          <span className="h6">Email:</span>
        </div>
        <div>
          <span className="h6">Type de plaignant:</span>
        </div>
        <div>
          <span className="h6">CIN:</span>
        </div>
        <div>
          <span className="h6">Adresse:</span>
        </div>
        <div>
          <span className="h6">Services CNT sollicité par le plaignant:</span>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="row mb-3">
        <h5 className="text-bg-secondary border rounded link">
          Réception de la plainte et dates importantes :
        </h5>
        <div>
          <span className="h6">Date de receptioin de la plainte:</span>
          Thu Dec 15 2022
        </div>
        <div>
          <span className="h6">Date de la 1ere communication:</span>
          Thu Dec 15 2022
        </div>
        <div>
          <span className="h6">Date de fermeture:</span>
          Thu Dec 15 2022
        </div>
        <div>
          <span className="h6">Mode de reception:</span>
          <ul>
            <li>Télephone</li>
            <li>email</li>
          </ul>
        </div>
        <div>
          <span className="h6">
            Nom et unité administrative du responsable du traitement de la
            plainte:
          </span>
          <p className="px-3">bla bla bla...</p>
        </div>
      </div>
      <div className="row mb-3">
        <h5 className="text-bg-secondary border rounded link">
          Détails de la plainte sur la qualité de service :
        </h5>
        <div>
          <span className="h6">Version des faits detaillée du client:</span>
          <p className="px-3">bla bla bla...</p>
        </div>
        <div>
          <span className="h6">
            Unités administratives et catégories d'emploi visées par la plainte:
          </span>
          <ul>
            <li>Préposé aux renseignements</li>
            <li>Médiateur</li>
            <li>Avocat</li>
          </ul>
        </div>
        <div>
          <span className="h6"></span>
          <p className="px-3">bla bla bla...</p>
        </div>
      </div>
      <div className="row mb-3">
        <h5 className="text-bg-secondary border rounded link">
          Motifs de la plainte:
        </h5>
        <div>
          <span className="h6">Motifs de la plainte:</span>
          <ul>
            <li>Préposé aux renseignements</li>
            <li>suivi et retours d'appels</li>
            <li>Protection confidentialité et renseignement personnels</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
