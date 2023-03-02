/* eslint-disable react/no-unescaped-entities */
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
  GridRowParams,
} from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { getUserCookiesClient } from "@/tools/authClient";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ProjetName, SiteName } from "@prisma/client";
import {
  getAllSuiviDeProjetOfUserClient,
  getSuiviDeProjetOfUserClient,
  ProjetOfUserClientInterface,
  ProjetParsedInterface,
  risque,
  updateDebutReelOfProjet,
  updateFinReelOfProjet,
} from "@/tools/SuiviDeProjetHandler";
import { columnsPart1, columnsPart2, headerClassName } from "./columnsDef";
import { Modal, Button, Nav } from "react-bootstrap";
import TableOfOneProjet from "../TableOfOneProjet/TableOfOneProjet";

export default function TableOfAllProjet({
  projetName,
}: {
  projetName: ProjetName;
}) {
  const [detailsSelected, setDetailsSelected] =
    useState<ProjetName>(projetName);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setDetailsSelected(projetName);
  };
  const handleShow = () => setShow(true);
  const user = getUserCookiesClient();
  const router = useRouter();
  const [allSuiviDeProjets, setAllSuiviDeProjets] = useState<
    ProjetOfUserClientInterface[]
  >([]);
  const [indexSuiviDeProjetsSelected, setIndexSuiviDeProjetsSelected] =
    useState<number>(0);
  const suiviDeProjetsSelected = allSuiviDeProjets[indexSuiviDeProjetsSelected];
  // const projets = suiviDeProjetsSelected?.[projetName] || [];
  const projets = allSuiviDeProjets.map((suiviProjet) => {
    const indexOfTache = suiviProjet[projetName].findIndex((tache) =>
      [0, 50].includes(tache.progression)
    );
    return suiviProjet[projetName].at(indexOfTache);
  });
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setDetailsSelected(projetName);
  }, [indexSuiviDeProjetsSelected, suiviDeProjetsSelected, projetName]);
  useEffect(() => {
    if (user) {
      setLoading(true);
      getAllSuiviDeProjetOfUserClient().then((ProjetOfUser) => {
        setAllSuiviDeProjets(ProjetOfUser);
        setLoading(false);
      });
    } else {
      router.refresh();
    }
  }, []);
  const columnsDef = [
    ...columnsPart1,
    {
      field: "debutReel",
      headerName: "Debut Réel",
      headerClassName,
      // resizable: true,
      width: 100,
      // editable: true,
      type: "date",
      renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
      // valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "finReel",
      headerName: "Fin Réel",
      headerClassName,
      width: 100,
      // editable: true,
      type: "date",
      renderCell: ({ value }) => value && new Date(value).toLocaleDateString(),
      // valueGetter: ({ value }) => value && new Date(value),
    },
    ...columnsPart2,
  ];
  const rowEnCours = suiviDeProjetsSelected?.projetSelected;
  return (
    <>
      <div className="bg-dark text-secondary px-1 py-4 text-center">
        <div
          className={`row text-bg-${
            risque[suiviDeProjetsSelected?.risque || "En bonne voie"].color
          }`}
        >
          <div className="col-3">
            <span className="badge text-bg-dark">Responsable :</span>
            <span> {rowEnCours?.responsable}</span>
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
            <span>{suiviDeProjetsSelected?.risque} </span>
          </div>
        </div>
        <div
          className={`row text-bg-${
            risque[suiviDeProjetsSelected?.risque || "En bonne voie"].color
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
      <div style={{ height: 700, width: "100%" }} className="shadow mb-3">
        <DataGrid
          isRowSelectable={() => true}
          onRowClick={({ row }: GridRowParams<ProjetParsedInterface>) => {
            const index = projets.findIndex((projet) => projet.id === row.id);
            if (index > -1) {
              setIndexSuiviDeProjetsSelected(index);
            }
          }}
          onRowDoubleClick={({ row }: GridRowParams<ProjetParsedInterface>) => {
            const index = projets.findIndex((projet) => projet.id === row.id);
            if (index > -1) {
              setIndexSuiviDeProjetsSelected(index);
              handleShow();
            }
          }}
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Détails</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav
            variant="tabs"
            activeKey={detailsSelected}
            onSelect={(selectedKey: ProjetName) =>
              setDetailsSelected(selectedKey)
            }
          >
            <Nav.Item>
              <Nav.Link eventKey="formation">Formation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="excecution">Excecution</Nav.Link>
            </Nav.Item>
          </Nav>
          <TableOfOneProjet
            projetName={detailsSelected}
            siteName={suiviDeProjetsSelected?.siteName || null}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
