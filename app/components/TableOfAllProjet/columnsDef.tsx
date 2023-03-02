import { risque } from "@/tools/SuiviDeProjetHandler";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
export const headerClassName = "text-bg-warning";

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
  return (
    <div className={` text-bg-${defaultOption.color} p-3`}>
      {" "}
      {defaultOption.title}{" "}
    </div>
  );
};
const renderCellJours: GridColDef["renderCell"] = ({ value }) =>
  value && `${value} Jour${value === 1 ? "" : "s"}`;
export const columnsPart1: GridColDef[] = [
  {
    field: "siteName",
    headerName: "Site",
    headerClassName,
    // resizable: true,
    // hide: true,
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
    field: "risqueProjet",
    headerName: "Risque-projet",
    headerClassName,
    // resizable: true,
    cellClassName: "p-0",
    width: 125,
    // hide: true,
    renderCell: renderRisque,
  },
  {
    field: "tacheName",
    headerName: "Tâche en cours",
    headerClassName,
    width: 225,
  },
  {
    field: "risque",
    headerName: "Risque-tache",
    headerClassName,
    // resizable: true,
    cellClassName: "p-0",
    width: 125,
    renderCell: renderRisque,
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
    field: "debutPrevisionnel",
    headerName: "Debut Previonnel",
    headerClassName,
    // resizable: true,
    width: 125,
    renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
  },

  {
    field: "finPrevisionnel",
    headerName: "Fin Previsionnel",
    headerClassName,
    // resizable: true,
    // hide: true,
    renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
    width: 125,
  },
  {
    field: "nombreDeJours",
    headerName: "Durée de tâche",
    headerClassName,
    // resizable: true,
    renderCell: renderCellJours,
    width: 125,
  },
];
export const columnsPart2: GridColDef[] = [
  {
    field: "tempsConsommes",
    headerName: "Temps Consommes",
    headerClassName,
    renderCell: renderCellJours,
    // resizable: true,
    width: 150,
  },
  {
    field: "retard",
    headerName: "Retard",
    headerClassName,
    // resizable: true,
    width: 75,
    renderCell: ({ value }) => (
      <span
        className={value > 0 ? "text-danger" : value < 0 ? "text-success" : ""}
      >
        {value && `${value} Jour${value === 1 ? "" : "s"}`}
      </span>
    ),
  },
];
