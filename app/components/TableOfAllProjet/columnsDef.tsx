import {
  risque,
  risqueList,
  tachesFormation,
} from "@/tools/SuiviDeProjetHandler";
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
const risqueComparator = (v1, v2) => {
  const indexV1 = risqueList.findIndex((risque) => risque === v1);
  const indexV2 = risqueList.findIndex((risque) => risque === v2);
  return indexV1 - indexV2;
};
export const columnsPart1: GridColDef[] = [
  {
    field: "siteName",
    headerName: "Site",
    headerClassName,
    // resizable: true,
    // hide: true,
    renderCell({ value }) {
      return (
        <span>
          {value}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-info-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        </span>
      );
    },
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
    sortComparator: risqueComparator,
  },
  {
    field: "tacheName",
    headerName: "Tâche en cours",
    headerClassName,
    width: 225,
    sortComparator: (v1, v2) => {
      const indexV1 = tachesFormation.findIndex(
        (tache) => tache.tacheName === v1
      );
      const indexV2 = tachesFormation.findIndex(
        (tache) => tache.tacheName === v2
      );
      return indexV1 - indexV2;
    },
    renderCell: ({ value }) => {
      const tache = tachesFormation.find((tache) => tache.tacheName === value);
      let step = 0;
      if (tache) {
        step = tache.etape;
      }
      return `(${step}/${tachesFormation.length}) ${value}`;
    },
  },
  {
    field: "risque",
    headerName: "Risque-tache",
    headerClassName,
    // resizable: true,
    cellClassName: "p-0",
    width: 125,
    renderCell: renderRisque,
    sortComparator: risqueComparator,
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
