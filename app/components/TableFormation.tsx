"use client";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { TextField } from "@mui/material";
const risque = {
  "En bonne voie": {
    title: "En bonne voie",
    value: -3000,
    color: "success",
  },
  "Risque faible": {
    title: "Risque faible",
    value: 1,
    color: "warning",
  },
  "Risque moyen": {
    title: "Risque moyen",
    value: 11,
    color: "warning",
  },
  "Risque élevé": {
    title: "Risque élevé",
    value: -3000,
    color: "danger",
  },
};
const renderRisque: GridColDef["renderCell"] = ({ value }) => {
  const val = value as keyof typeof risque;
  let defaultOption = {
    title: "Risque inconnue",
    value: 0,
    color: "secondary",
  };
  if (Object.keys(risque).includes(val)) {
    defaultOption = risque[val];
  }
  return <div className={` text-bg-${defaultOption.color} p-3`}> {value} </div>;
};
const etapes = [
  "ANALYSE TERROIR ET RESTRUCTURATION DES CLP",
  "ANALYSE DES PARTIES PRENANTES et RESTRUCTURATION COSAP ",
  "IDENTIFICATION LOCALITE CIBLE, BENEFICIAIRES, MICROPROJET, APPROCHE GENRE, INDICATEURS ",
  "IMPACTS, PGES, RISQUES, MGP ",
  "RESTITUTION AUX COMMUNAUTES",
  "EVALUATION PARTICIPATIVE ",
];
const renderProgression: GridColDef["renderCell"] = ({ value }) => {
  return (
    <div
      className="progress w-100 shadow  border"
      role="progressbar"
      aria-label="Basic example"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-bar py-2" style={{ width: value + "%" }}>
        {" "}
        {value}%{" "}
      </div>
    </div>
  );
};
const rows: GridRowsProp = etapes.map((etape, index) => {
  return {
    id: index,
    site: "ABT",
    etape,
    email: index + "raberolio@gmail.com",
    risqueProjet: "En bonne voie",
    risqueTache: "En bonne voie",
    responsable: "Rabe",
    progression: 0,
    debutPrevionnel: new Date(),
    nombreDeJours: 1,
    finPrevisionnel: new Date(),
    debutReel: new Date(),
    finReel: new Date(),
    perturbation: 0,
    tempsConsommes: 0,
  };
});
const headerClassName = "text-bg-warning";
const columns: GridColDef[] = [
  {
    field: "site",
    headerName: "Site",
    headerClassName,
    // resizable: true,
    hide: true,
  },
  { field: "etape", headerName: "Tâche", headerClassName, width: 300 },
  {
    field: "risqueProjet",
    headerName: "Risque-projet",
    headerClassName,
    // resizable: true,
    cellClassName: "p-0",
    width: 125,
    hide: true,
    renderCell: renderRisque,
  },
  {
    field: "risqueTache",
    headerName: "Risque-tache",
    headerClassName,
    // resizable: true,
    cellClassName: "p-0",
    width: 125,
    renderCell: renderRisque,
  },
  {
    field: "responsable",
    headerName: "Responsable",
    headerClassName,
    // resizable: true,
    width: 125,
    hide: true,
  },
  {
    field: "progression",
    headerName: "Progression",
    headerClassName,
    width: 125,
    // resizable: true,
    cellClassName: "p-0",
    renderCell: renderProgression,
  },
  {
    field: "debutPrevionnel",
    headerName: "Debut Previonnel",
    headerClassName,
    // resizable: true,
    width: 150,
    hide: true,
    // renderCell() {
    //   return <div>ss</div>;
    // },
  },
  {
    field: "nombreDeJours",
    headerName: "Nombre De Jours",
    headerClassName,
    // resizable: true,
    width: 150,
  },
  {
    field: "finPrevisionnel",
    headerName: "Fin Previsionnel",
    headerClassName,
    // resizable: true,
    hide: true,
    width: 150,
  },
  {
    field: "perturbation",
    headerName: "Perturbation",
    headerClassName,
    // resizable: true,
    width: 125,
  },
  {
    field: "tempsConsommes",
    headerName: "Temps Consommes",
    headerClassName,
    // resizable: true,
    width: 150,
  },
  {
    field: "debutReel",
    headerName: "Debut Réel",
    headerClassName,
    // resizable: true,
    width: 125,
    editable: true,
    type: "date",
    valueParser(value, param) {
      return value;
    },
  },
  {
    field: "finReel",
    headerName: "Fin Réel",
    headerClassName,
    width: 125,
    editable: true,
    type: "date",
    valueParser(value, param) {
      return value;
    },
  },
];

export default function TableFormation() {
  return (
    <>
      <div className="bg-dark text-secondary px-1 py-4 text-center">
        <div className="py-3">
          <h1 className="display-5 fw-bold text-white">Suivi De Formation</h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4"></p>
            {/* <div className="d-none gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
              >
                Custom button
              </button>
              <button
                type="button"
                className="btn btn-outline-light btn-lg px-4"
              >
                Secondary
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="row text-bg-success">
        <div className="col-3">
          <span className="badge text-bg-dark">Responsable :</span>
          <span>Rabe</span>
        </div>
        <div className="col-6">
          <span className="badge text-bg-dark "> Tâche en cours :</span>
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="This top tooltip is themed via CSS variables."
          >
            {etapes.at(0)}
          </span>
        </div>
        <div className="col-3">
          <span className="badge text-bg-dark"> Risque-projet :</span>
          <span>En bonne voie</span>
        </div>
      </div>
      <div className="row text-bg-success">
        <div className="col-3">
          <span className="badge text-bg-dark">Site :</span>
          <span>ABT</span>
        </div>
        <div className="col-6">
          <span className="badge text-bg-dark ">Debut Previonnel :</span>
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="This top tooltip is themed via CSS variables."
          >
            02/06/2023
          </span>
        </div>
        <div className="col-3">
          <span className="badge text-bg-dark"> Fin Previsionnel:</span>
          <span>02/06/2023</span>
        </div>
      </div>
      <div style={{ height: 500, width: "100%" }} className="shadow mb-3">
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: () => (
              <>
                <div className="text-bg-dark">
                  <GridToolbar />
                </div>
              </>
            ),
          }}
        />
      </div>
    </>
  );
}
