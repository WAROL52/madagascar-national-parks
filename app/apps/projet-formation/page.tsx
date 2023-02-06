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
const rows: GridRowsProp = Array.from({ length: 15 }).map((_, index) => {
  return {
    id: index,
    site: "site" + index,
    etape: "etape" + index,
    email: index + "raberolio@gmail.com",
    risqueProjet: "En bonne voie",
    risqueTache: "En bonne voie",
    responsable: "Rabe" + index,
    progression: 50,
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
  },
  { field: "etape", headerName: "Etape", headerClassName },
  {
    field: "risqueProjet",
    headerName: "Risque-projet",
    headerClassName,
    cellClassName: "p-0",
    width: 125,
    renderCell: renderRisque,
  },
  {
    field: "risqueTache",
    headerName: "Risque-tache",
    headerClassName,
    cellClassName: "p-0",
    width: 125,
    renderCell: renderRisque,
  },
  {
    field: "responsable",
    headerName: "Responsable",
    headerClassName,
    width: 125,
  },
  {
    field: "progression",
    headerName: "Progression",
    headerClassName,
    width: 125,
    cellClassName: "p-0",
    renderCell: renderProgression,
  },
  {
    field: "debutPrevionnel",
    headerName: "Debut Previonnel",
    headerClassName,
    width: 150,
    renderCell() {
      return <div>ss</div>;
    },
  },
  {
    field: "nombreDeJours",
    headerName: "Nombre De Jours",
    headerClassName,
    width: 150,
  },
  {
    field: "finPrevisionnel",
    headerName: "Fin Previsionnel",
    headerClassName,
    width: 150,
  },
  { field: "debutReel", headerName: "Debut Réel", headerClassName, width: 125 },
  { field: "finReel", headerName: "Fin Réel", headerClassName, width: 125 },
  {
    field: "perturbation",
    headerName: "Perturbation",
    headerClassName,
    width: 125,
  },
  {
    field: "tempsConsommes",
    headerName: "Temps Consommes",
    headerClassName,
    width: 150,
  },
];

export default function Page() {
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