"use client";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  GridValueSetterParams,
} from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { getUserCookiesClient } from "@/tools/authClient";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ProjetName, SiteName } from "@prisma/client";
import {
  getSuiviDeProjetOfUserClient,
  ProjetOfUserClientInterface,
  ProjetParsedInterface,
  updateDebutReelOfProjet,
  updateFinReelOfProjet,
} from "@/tools/SuiviDeProjetHandler";
import moment from "moment";
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
  return (
    <div className={` text-bg-${defaultOption.color} p-3`}>
      {" "}
      {defaultOption.title}{" "}
    </div>
  );
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

const headerClassName = "text-bg-warning";
const renderCellJours: GridColDef["renderCell"] = ({ value }) =>
  value && `${value} Jour${value === 1 ? "" : "s"}`;
const columnsPart1: GridColDef[] = [
  {
    field: "siteName",
    headerName: "Site",
    headerClassName,
    // resizable: true,
    hide: true,
  },
  { field: "tacheName", headerName: "Tâche", headerClassName, width: 225 },
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
    field: "risque",
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

const columnsPart2: GridColDef[] = [
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
export default function TableOfOneProjet({
  projetName,
  siteName = null,
}: {
  projetName: ProjetName;
  siteName?: SiteName | null;
}) {
  const user = getUserCookiesClient();
  const router = useRouter();
  const [suiviDeProjets, setSuiviDeProjets] =
    useState<ProjetOfUserClientInterface>(null);
  const projets = suiviDeProjets?.[projetName] || [];
  const [isLoading, setLoading] = useState<boolean>(true);
  if (!siteName) {
    siteName = user?.email?.siteName;
  }
  useEffect(() => {
    if (user) {
      setLoading(true);
      getSuiviDeProjetOfUserClient(
        siteName,
        `${user?.nom || ""} ${user?.prenom || ""}`
      ).then((ProjetOfUser) => {
        setSuiviDeProjets(ProjetOfUser);
        setLoading(false);
      });
    } else {
      router.refresh();
    }
  }, []);
  const updateDebutReelOrFinReel = (
    type: "debutReel" | "finReel",
    projet: ProjetParsedInterface,
    dateValue: Date | null
  ) => {
    setLoading(true);
    const update =
      type === "debutReel" ? updateDebutReelOfProjet : updateFinReelOfProjet;
    update(suiviDeProjets.responsable, projet, dateValue).then(
      (projetOfUser) => {
        // router.refresh();
        if (projetOfUser) {
          setSuiviDeProjets(projetOfUser);
        }
        setLoading(false);
      }
    );
  };
  const columnsDef = [
    ...columnsPart1,
    {
      field: "debutReel",
      headerName: "Debut Réel",
      headerClassName,
      // resizable: true,
      width: 100,
      editable: true,
      type: "date",
      renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
      valueSetter: (params: GridValueSetterParams) => {
        const projet = params.row as ProjetParsedInterface;
        const value = params.value && new Date(params.value);
        updateDebutReelOrFinReel("debutReel", projet, value);
        projet.debutReel = value;
        return { ...projet };
      },
      valueParser: (value, param) => {
        const projet = param.row as ProjetParsedInterface;
        value = (value && new Date(value)) as Date | null;
        if (projet.finReel && moment(projet.finReel).diff(value, "days") < 0) {
          alert(
            "la date de début réelle DOIT être inferieur ou égale à la date de fin réelle!"
          );
          return value;
        }
        if (!["aucun", "tous"].includes(projet.siteName)) {
          if (projet.debutReel) {
            return new Date(projet.debutReel);
          }
        }
        return value;
      },
    },
    {
      field: "finReel",
      headerName: "Fin Réel",
      headerClassName,
      width: 100,
      editable: true,
      type: "date",
      renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
      valueSetter: (params: GridValueSetterParams) => {
        const projet = params.row as ProjetParsedInterface;
        const value = params.value && new Date(params.value);
        updateDebutReelOrFinReel("finReel", projet, value);
        console.log("valueSetter", value);
        projet.finReel = value;
        return { ...projet };
      },
      valueParser: (value, param) => {
        const projet = param.row as ProjetParsedInterface;
        if (!projet.debutReel) {
          alert("Entrez la date de début réelle en premier!");
          return null;
        }
        console.log(value, moment(value).diff(projet.debutReel, "days"));
        if (value && moment(value).diff(projet.debutReel, "days") < 0) {
          alert(
            "la date de fin réelle DOIT être superieur ou égale à la date de début réelle!"
          );
          if (projet.finReel) return new Date(projet.finReel);
          if (projet.debutReel) return new Date(projet.debutReel);
          return null;
        }

        if (!["aucun", "tous"].includes(projet.siteName)) {
          if (projet.finReel) {
            return new Date(projet.finReel);
          }
        }

        return value;
      },
    },
    ...columnsPart2,
  ];
  const rowEnCours = suiviDeProjets?.projetSelected;
  return (
    <>
      <div className="bg-dark text-secondary px-1 py-4 text-center">
        <div
          className={`row text-bg-${
            risque[suiviDeProjets?.risque || "En bonne voie"].color
          }`}
        >
          <div className="col-3">
            <span className="badge text-bg-dark">Responsable :</span>
            <span>
              {" "}
              {user?.nom} {user?.prenom}
            </span>
          </div>
          <div className="col-6">
            <span className="badge text-bg-dark "> Tâche en cours :</span>
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="This top tooltip is themed via CSS variables."
            >
              {rowEnCours && rowEnCours.tacheName}
            </span>
          </div>
          <div className="col-3">
            <span className="badge text-bg-dark"> Risque-projet :</span>
            <span>{suiviDeProjets?.risque} </span>
          </div>
        </div>
        <div
          className={`row text-bg-${
            risque[suiviDeProjets?.risque || "En bonne voie"].color
          }`}
        >
          <div className="col-3">
            <span className="badge text-bg-dark">Site :</span>
            <span>{rowEnCours && rowEnCours.siteName}</span>
          </div>
          <div className="col-6">
            <span className="badge text-bg-dark ">Debut Previonnel :</span>
            <span
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="This top tooltip is themed via CSS variables."
            >
              {rowEnCours &&
                new Date(rowEnCours.debutPrevisionnel).toLocaleDateString()}
            </span>
          </div>
          <div className="col-3">
            <span className="badge text-bg-dark"> Fin Previsionnel:</span>
            <span>
              {rowEnCours &&
                new Date(rowEnCours.finPrevisionnel).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div style={{ height: 500, width: "100%" }} className="shadow mb-3">
        <DataGrid
          rows={projets}
          // @ts-ignore
          columns={columnsDef}
          components={{
            Toolbar: () => (
              <>
                <div className="text-bg-dark">
                  <GridToolbar />
                </div>
              </>
            ),
          }}
          loading={isLoading}
        />
      </div>
    </>
  );
}
