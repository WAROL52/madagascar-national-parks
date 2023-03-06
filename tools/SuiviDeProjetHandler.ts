import { SuiviDeProjet } from "@/prisma/dto/suivi-de-projet/entities/suivi-de-projet.entity";
import { SiteName } from "@prisma/client";
import moment from "moment";
import { AxiosService } from "./axiosService";
export const NOMBRE_DE_JOURS_TOTAL_OF_SUIVIDEPROJET = 150;
export const COEFFICIENT_DE_RISQUE_OF_SUIVIDEPROJET = 2;
export type RisqueType =
  | "En bonne voie"
  | "Risque faible"
  | "Risque moyen"
  | "Risque élevé";
export const risqueList = [
  "En bonne voie",
  "Risque faible",
  "Risque moyen",
  "Risque élevé",
] as const;
export interface RisquePropsInterface {
  nombreDeJours: number;
  tempsConsommes: number;
  retard: number;
  risque: RisqueType;
  risqueValue: number;

  /**
   * C'est une valeur constante qui evalue la gravité du risque.
   * Plus le coefficient grand plus le risque est élévé
   */
  coefficientDeRisque: number;
}
export interface ProjetParsedInterface
  extends SuiviDeProjet,
    RisquePropsInterface {
  progression: number;
  risqueProjet: RisqueType;
  responsable: string;
}
export interface ProjetOfUserClientInterface extends RisquePropsInterface {
  allProjets: ProjetParsedInterface[];
  formation: ProjetParsedInterface[];
  excecution: ProjetParsedInterface[];
  responsable: string;
  siteName: SiteName;

  jourMax: typeof NOMBRE_DE_JOURS_TOTAL_OF_SUIVIDEPROJET;
  progressionDeJours: number;
  indexOfProjetSelected: number;
  projetSelected: ProjetParsedInterface;
}
export function evaluateValueOfRisque(valueOfRisque: number): RisqueType {
  if (valueOfRisque <= 0) return "En bonne voie";
  if (valueOfRisque <= 25) return "Risque faible";
  if (valueOfRisque <= 50) return "Risque moyen";
  return "Risque élevé";
}
export function parseRisque(
  projet: SuiviDeProjet,
  coefficientDeRisque: RisquePropsInterface["coefficientDeRisque"]
): RisquePropsInterface {
  const nombreDeJours =
    moment(projet.finPrevisionnel).diff(projet.debutPrevisionnel, "days") + 1;

  const dateFinReel = projet.finReel || new Date();
  const dateDebutReel =
    !projet.debutReel ||
    moment(projet.debutPrevisionnel).isBefore(projet.debutReel, "days")
      ? projet.debutPrevisionnel
      : projet.debutReel;

  let tempsConsommes = moment(dateFinReel).diff(dateDebutReel, "days") + 1;
  if (tempsConsommes < 0) {
    tempsConsommes = 0;
  }
  let retard = moment(dateFinReel).diff(projet.finPrevisionnel, "days");
  if (retard < 0) {
    if (!projet.debutReel && !projet.finReel) {
      retard = 0;
    } else if (projet.debutReel && !projet.finReel) {
      retard = moment(new Date()).diff(projet.finPrevisionnel, "days");
    }
  }
  // retard =
  const risqueValue = (retard * 100) / nombreDeJours;
  return {
    coefficientDeRisque,
    nombreDeJours,
    tempsConsommes,
    risqueValue,
    retard,
    risque: evaluateValueOfRisque(risqueValue * coefficientDeRisque),
  };
}
export function parseRisqueOfAllProjets(
  allProjets: ProjetParsedInterface[]
): RisquePropsInterface {
  const coefficientDeRisque = COEFFICIENT_DE_RISQUE_OF_SUIVIDEPROJET;
  const nombreDeJours = NOMBRE_DE_JOURS_TOTAL_OF_SUIVIDEPROJET;
  let retard: number = 0;
  let nombreDeJoursTotal = 0;
  allProjets.map((projet) => {
    nombreDeJoursTotal += projet.nombreDeJours;
    if (projet.retard > 0) {
      retard += projet.retard;
    }
  });
  const risqueValue = (retard * 100) / nombreDeJoursTotal;
  const risque = evaluateValueOfRisque(risqueValue * coefficientDeRisque);
  allProjets.map((projet) => (projet.risqueProjet = risque));
  return {
    coefficientDeRisque,
    nombreDeJours: nombreDeJoursTotal,
    retard,
    risque,
    risqueValue,
    tempsConsommes: moment(new Date()).diff(
      allProjets.at(0).debutPrevisionnel,
      "days"
    ),
  };
}
export function parseProjet(projet: SuiviDeProjet): ProjetParsedInterface {
  projet.debutPrevisionnel = new Date(projet.debutPrevisionnel);
  projet.finPrevisionnel = new Date(projet.finPrevisionnel);

  projet.finReel = projet.finReel && new Date(projet.finReel);
  projet.debutReel = projet.debutReel && new Date(projet.debutReel);

  const coefficientDeRisque = 1;
  const risqueParsed = parseRisque(projet, coefficientDeRisque);
  return {
    ...projet,
    ...risqueParsed,
    progression:
      projet.debutReel && projet.finReel ? 100 : projet.debutReel ? 50 : 0,
    risqueProjet: "En bonne voie",
    responsable: "",
  };
}
export function parseSuiviDeProjet(suiviDeProjets: SuiviDeProjet[]) {
  const formation: ProjetParsedInterface[] = [];
  const excecution: ProjetParsedInterface[] = [];
  let tempsConsommesOfSuiviDeProjet = 0;
  let retardOfSuiviDeProjet = 0;
  const allProjets = suiviDeProjets.map((suiviDeProjet) => {
    const projet =
      suiviDeProjet.projetName === "formation" ? formation : excecution;
    const projetParsed = parseProjet(suiviDeProjet);
    tempsConsommesOfSuiviDeProjet += projetParsed.tempsConsommes;
    retardOfSuiviDeProjet += projetParsed.retard;
    projet.push(projetParsed);
    return projetParsed;
  });
  return {
    allProjets,
    formation,
    excecution,
    tempsConsommesOfSuiviDeProjet,
    retardOfSuiviDeProjet,
  };
}
export async function getAllSuiviDeProjetOfUserClient1(): Promise<
  ProjetOfUserClientInterface[]
> {
  const suiviDeProjets: ProjetOfUserClientInterface[] = [];
  const siteNames = Object.keys(SiteName) as SiteName[];
  for (let index = 0; index < siteNames.length; index++) {
    const siteName = siteNames[index];
    if (!siteName.includes("_")) {
      suiviDeProjets.push(await getSuiviDeProjetOfUserClient(siteName, ""));
    }
  }
  return suiviDeProjets;
}
export async function getAllSuiviDeProjetOfUserClient(): Promise<
  ProjetOfUserClientInterface[]
> {
  const allsuiviDeProjets = await getAllSuiviDeProjet();
  const suiviDeProjets: ProjetOfUserClientInterface[] = allsuiviDeProjets.map(
    ({ suiviDeProjet, siteName, responsable }) =>
      parseSuiviDeProjetOfUserClient(suiviDeProjet, siteName, responsable)
  );

  return suiviDeProjets;
}
export async function getSuiviDeProjet(siteName: SiteName) {
  const suiviDeProjets = await AxiosService.getSuiviDeProjet(siteName);
  return parseSuiviDeProjet(suiviDeProjets);
}
export async function getAllSuiviDeProjet() {
  const suiviDeProjets = await AxiosService.getAllSuiviDeProjet();
  const allsuiviDeProjets: {
    suiviDeProjet: ReturnType<typeof parseSuiviDeProjet>;
    siteName: SiteName;
    responsable: string;
  }[] = [];
  const siteNames = Object.keys(SiteName) as SiteName[];
  for (let index = 0; index < siteNames.length; index++) {
    const siteName = siteNames[index];
    if (!siteName.includes("_")) {
      const suiviDeProjetsFiltered = suiviDeProjets.filter(
        (projet) => projet.siteName === siteName
      );
      allsuiviDeProjets.push({
        suiviDeProjet: parseSuiviDeProjet(suiviDeProjetsFiltered),
        siteName,
        responsable: "-",
      });
    }
  }
  return allsuiviDeProjets;
}
export function parseSuiviDeProjetOfUserClient(
  suiviDeProjet: ReturnType<typeof getSuiviDeProjet> extends Promise<infer T>
    ? T
    : never,
  siteName: SiteName,
  responsable: string
): ProjetOfUserClientInterface {
  const {
    retardOfSuiviDeProjet,
    formation,
    excecution,
    allProjets,
    tempsConsommesOfSuiviDeProjet,
  } = suiviDeProjet;
  const jourMax = NOMBRE_DE_JOURS_TOTAL_OF_SUIVIDEPROJET;
  const progressionDeJours = tempsConsommesOfSuiviDeProjet;
  const indexOfProjetSelected = allProjets.findIndex((projet) => {
    if ([0, 50].includes(projet.progression)) return true;
  });
  const projetSelected = allProjets.at(indexOfProjetSelected);
  const risqueParsed = parseRisqueOfAllProjets(allProjets);

  return {
    ...risqueParsed,
    siteName,
    responsable,
    formation,
    excecution,
    allProjets,
    jourMax,
    progressionDeJours,
    indexOfProjetSelected,
    projetSelected,
  };
}
export async function getSuiviDeProjetOfUserClient(
  siteName: SiteName,
  responsable: string
): Promise<ProjetOfUserClientInterface> {
  const suiviDeProjet = await getSuiviDeProjet(siteName);
  return parseSuiviDeProjetOfUserClient(suiviDeProjet, siteName, responsable);
}
export async function updateDebutReelOfProjet(
  responsable: string,
  projet: ProjetParsedInterface,
  debutReel: Date | null
): Promise<null | ProjetOfUserClientInterface> {
  debutReel = debutReel && new Date(debutReel);
  if (!debutReel) {
    debutReel = null;
  }
  if (projet.finReel && moment(projet.finReel).diff(debutReel, "days") < 0)
    return null;
  const updatedProjet = await AxiosService.updateDebutReelOfProjet(
    projet.id,
    debutReel
  );
  return getSuiviDeProjetOfUserClient(projet.siteName, responsable);
}
export async function updateFinReelOfProjet(
  responsable: string,
  projet: ProjetParsedInterface,
  finReel: Date | null
): Promise<null | ProjetOfUserClientInterface> {
  finReel = finReel && new Date(finReel);
  if (!projet.debutReel) return null;
  if (finReel && moment(finReel).diff(projet.debutReel, "days") < 0)
    return null;
  const updatedProjet = await AxiosService.updateFinReelOfProjet(
    projet.id,
    finReel
  );
  return getSuiviDeProjetOfUserClient(projet.siteName, responsable);
}
export const risque = {
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
export const etapes = [
  "ANALYSE TERROIR ET RESTRUCTURATION DES CLP",
  "ANALYSE DES PARTIES PRENANTES et RESTRUCTURATION COSAP ",
  "IDENTIFICATION LOCALITE CIBLE, BENEFICIAIRES, MICROPROJET, APPROCHE GENRE, INDICATEURS ",
  "IMPACTS, PGES, RISQUES, MGP ",
  "RESTITUTION AUX COMMUNAUTES",
  "EVALUATION PARTICIPATIVE ",
];
export const tachesFormation = [
  {
    tacheName: "ANALYSE TERROIR ET RESTRUCTURATION DES CLP",
    debutPrevionnel: new Date(2023, 1, 6), //"06/02/2023"
    finPrevisionnel: new Date(2023, 1, 6), //"06/02/2023"
    projetName: "formation",
    etape: 1,
  },
  {
    tacheName: "ANALYSE DES PARTIES PRENANTES et RESTRUCTURATION COSAP ",
    debutPrevionnel: new Date(2023, 2, 6), //"06/03/2023"
    finPrevisionnel: new Date(2023, 2, 7), //"07/03/2023"
    projetName: "formation",
    etape: 2,
  },
  {
    tacheName:
      "IDENTIFICATION LOCALITE CIBLE, BENEFICIAIRES, MICROPROJET, APPROCHE GENRE, INDICATEURS ",
    debutPrevionnel: new Date(2023, 3, 6), //"06/04/2023"
    finPrevisionnel: new Date(2023, 3, 7), //"07/04/2023"
    projetName: "formation",
    etape: 3,
  },
  {
    tacheName: "IMPACTS, PGES, RISQUES, MGP ",
    debutPrevionnel: new Date(2023, 4, 8), //"08/05/2023"
    finPrevisionnel: new Date(2023, 4, 9), //"09/05/2023"
    projetName: "formation",
    etape: 4,
  },
  {
    tacheName: "RESTITUTION AUX COMMUNAUTES",
    debutPrevionnel: new Date(2023, 5, 6), //"06/06/2023"
    finPrevisionnel: new Date(2023, 5, 6), //"06/06/2023"
    projetName: "formation",
    etape: 5,
  },
  {
    tacheName: "EVALUATION PARTICIPATIVE ",
    debutPrevionnel: new Date(2023, 6, 1), //"01/07/2023"
    finPrevisionnel: new Date(2023, 6, 1), //"01/07/2023"
    projetName: "formation",
    etape: 6,
  },
] as const;
export const tachesExcecution = [
  {
    tacheName: "ANALYSE TERROIR ET RESTRUCTURATION DES CLP",
    debutPrevionnel: new Date(2023, 1, 7), //"07/02/2023"
    finPrevisionnel: new Date(2023, 2, 5), //"05/03/2023"
    projetName: "excecution",
    etape: 1,
  },
  {
    tacheName: "ANALYSE DES PARTIES PRENANTES et RESTRUCTURATION COSAP ",
    debutPrevionnel: new Date(2023, 2, 8), //"08/03/2023"
    finPrevisionnel: new Date(2023, 3, 5), //"05/04/2023"
    projetName: "excecution",
    etape: 2,
  },
  {
    tacheName:
      "IDENTIFICATION LOCALITE CIBLE, BENEFICIAIRES, MICROPROJET, APPROCHE GENRE, INDICATEURS ",
    debutPrevionnel: new Date(2023, 3, 8), //"08/04/2023"
    finPrevisionnel: new Date(2023, 4, 7), //"07/05/2023"
    projetName: "excecution",
    etape: 3,
  },
  {
    tacheName: "IMPACTS, PGES, RISQUES, MGP ",
    debutPrevionnel: new Date(2023, 4, 10), //"10/05/2023"
    finPrevisionnel: new Date(2023, 5, 5),
    projetName: "excecution",
    etape: 4,
  },
  {
    tacheName: "RESTITUTION AUX COMMUNAUTES",
    debutPrevionnel: new Date(2023, 5, 7),
    finPrevisionnel: new Date(2023, 5, 30),
    projetName: "excecution",
    etape: 5,
  },
  {
    tacheName: "EVALUATION PARTICIPATIVE ",
    debutPrevionnel: new Date(2023, 6, 2),
    finPrevisionnel: new Date(2023, 6, 3),
    projetName: "excecution",
    etape: 6,
  },
] as const;
