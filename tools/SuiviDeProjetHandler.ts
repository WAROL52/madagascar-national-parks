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

  const dateFin = projet.finReel || projet.debutReel || new Date();
  let tempsConsommes =
    moment(dateFin).diff(projet.debutPrevisionnel, "days") + 1;
  if (tempsConsommes < 0) {
    if (projet.debutReel && projet.finReel) {
      tempsConsommes =
        moment(projet.finReel).diff(projet.debutReel, "days") + 1;
    } else if (projet.debutReel) {
      tempsConsommes = moment(new Date()).diff(projet.debutReel, "days") + 1;
    }
    if (tempsConsommes < 0) {
      tempsConsommes = 0;
    }
  }
  const retard = moment(dateFin).diff(projet.finPrevisionnel, "days");
  // retard =
  const risqueValue = (retard * 100) / nombreDeJours;
  return {
    coefficientDeRisque,
    nombreDeJours,
    tempsConsommes,
    risqueValue,
    retard,
    risque: evaluateValueOfRisque(risqueValue / coefficientDeRisque),
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
  };
}
export async function getSuiviDeProjet(siteName: SiteName) {
  const formation: ProjetParsedInterface[] = [];
  const excecution: ProjetParsedInterface[] = [];
  let tempsConsommesOfSuiviDeProjet = 0;
  let retardOfSuiviDeProjet = 0;
  const suiviDeProjets = await AxiosService.getSuiviDeProjet(siteName);
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
export async function getSuiviDeProjetOfUserClient(
  siteName: SiteName,
  responsable: string
): Promise<ProjetOfUserClientInterface> {
  const {
    retardOfSuiviDeProjet,
    formation,
    excecution,
    allProjets,
    tempsConsommesOfSuiviDeProjet,
  } = await getSuiviDeProjet(siteName);
  const jourMax = NOMBRE_DE_JOURS_TOTAL_OF_SUIVIDEPROJET;
  const progressionDeJours = tempsConsommesOfSuiviDeProjet;
  const indexOfProjetSelected = allProjets.findIndex((projet) => {
    if ([0, 50].includes(projet.progression)) return true;
  });
  const projetSelected = allProjets.at(indexOfProjetSelected);
  const risqueParsed = parseRisque(projetSelected, 1);

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
export async function updateDebutReelOfProjet(
  responsable: string,
  projet: ProjetParsedInterface,
  debutReel: Date
): Promise<null | ProjetOfUserClientInterface> {
  debutReel = new Date(debutReel);
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
  finReel: Date
): Promise<null | ProjetOfUserClientInterface> {
  finReel = new Date(finReel);
  if (!projet.debutReel) return null;
  if (moment(finReel).diff(projet.debutReel, "days") < 0) return null;
  const updatedProjet = await AxiosService.updateFinReelOfProjet(
    projet.id,
    finReel
  );
  return getSuiviDeProjetOfUserClient(projet.siteName, responsable);
}
