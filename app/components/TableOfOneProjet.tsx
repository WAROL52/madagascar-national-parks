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
import { SuiviFormation } from "@/prisma/dto/suivi-formation/entities/suivi-formation.entity";
import { ProjetName } from "@prisma/client";
import {
  getSuiviDeProjetOfUserClient,
  ProjetOfUserClientInterface,
  ProjetParsedInterface,
  updateDebutReelOfProjet,
  updateFinReelOfProjet,
} from "@/tools/SuiviDeProjetHandler";
const risque = {
  EnBonneVoie: {
    title: "En bonne voie",
    value: -3000,
    color: "success",
  },
  RisqueFaible: {
    title: "Risque faible",
    value: 1,
    color: "warning",
  },
  RisqueMoyen: {
    title: "Risque moyen",
    value: 11,
    color: "warning",
  },
  RisqueEleve: {
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
const columns: GridColDef[] = [
  {
    field: "siteName",
    headerName: "Site",
    headerClassName,
    // resizable: true,
    hide: true,
  },
  { field: "tacheName", headerName: "Tâche", headerClassName, width: 300 },
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
    renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
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
    // hide: true,
    renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
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
];

export default function TableOfOneProjet({
  projetName,
}: {
  projetName: ProjetName;
}) {
  const user = getUserCookiesClient();
  const router = useRouter();
  const [suiviDeProjets, setSuiviDeProjets] =
    useState<ProjetOfUserClientInterface>(null);
  const projets = suiviDeProjets[projetName];
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (user) {
      setLoading(true);
      getSuiviDeProjetOfUserClient(
        user.email.siteName,
        `${user.nom} ${user.prenom}`
      ).then((ProjetOfUser) => {
        setSuiviDeProjets(ProjetOfUser);
        setLoading(false);
      });
    } else {
      router.refresh();
    }
  }, [user, router]);
  const updateDebutReelOrFinReel = (
    type: "debutReel" | "finReel",
    projet: ProjetParsedInterface,
    dateValue: Date
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
    ...columns,
    {
      field: "debutReel",
      headerName: "Debut Réel",
      headerClassName,
      // resizable: true,
      width: 125,
      editable: true,
      type: "date",
      renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
      // valueGetter: ({ value }) => value && new Date(value),
      valueParser: (value, param) => {
        const projet = param.row as ProjetParsedInterface;
        value = new Date(value);
        if (projet.debutReel) {
          return new Date(projet.debutReel);
        }

        updateDebutReelOrFinReel("debutReel", projet, value);

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
      renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
      // valueGetter: ({ value }) => value && new Date(value),
      valueParser: (value, param) => {
        const projet = param.row as ProjetParsedInterface;
        if (!projet.debutReel) {
          return null;
        }
        if (projet.finReel) {
          return new Date(projet.finReel);
        }
        updateDebutReelOrFinReel("finReel", projet, value);

        return value;
      },
    },
  ];
  const rowEnCours = suiviDeProjets?.projetSelected;
  return (
    <>
      <div className="bg-dark text-secondary px-1 py-4 text-center">
        <div className="row text-bg-success">
          <div className="col-3">
            <span className="badge text-bg-dark">Responsable :</span>
            <span>
              {" "}
              {user.nom} {user.prenom}
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
            <span>En bonne voie</span>
          </div>
        </div>
        <div className="row text-bg-success">
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
