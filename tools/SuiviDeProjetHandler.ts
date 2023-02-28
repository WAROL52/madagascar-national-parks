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
  if (valueOfRisque <= 25) return "En bonne voie";
  if (valueOfRisque <= 50) return "Risque faible";
  if (valueOfRisque <= 75) return "Risque moyen";
  return "Risque élevé";
}
export function parseRisque(
  nombreDeJours: RisquePropsInterface["nombreDeJours"],
  tempsConsommes: RisquePropsInterface["tempsConsommes"],
  coefficientDeRisque: RisquePropsInterface["coefficientDeRisque"]
): RisquePropsInterface {
  const retard = tempsConsommes - nombreDeJours;
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

  const nombreDeJours =
    moment(projet.finPrevisionnel).diff(projet.debutPrevisionnel, "days") + 1;
  let tempsConsommes =
    moment(projet.finReel || new Date()).diff(
      projet.debutReel || new Date(),
      "days"
    ) + 1;
  if (tempsConsommes < 0 || (!projet.finReel && !projet.debutReel)) {
    tempsConsommes = 0;
  }
  const coefficientDeRisque = 1;
  const risqueParsed = parseRisque(
    nombreDeJours,
    tempsConsommes,
    coefficientDeRisque
  );
  if (!projet.finReel && !projet.debutReel) {
    risqueParsed.retard = 0;
  }
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
  const risqueParsed = parseRisque(
    NOMBRE_DE_JOURS_TOTAL_OF_SUIVIDEPROJET,
    NOMBRE_DE_JOURS_TOTAL_OF_SUIVIDEPROJET - retardOfSuiviDeProjet,
    COEFFICIENT_DE_RISQUE_OF_SUIVIDEPROJET
  );
  const jourMax = NOMBRE_DE_JOURS_TOTAL_OF_SUIVIDEPROJET;
  const progressionDeJours = tempsConsommesOfSuiviDeProjet;
  const indexOfProjetSelected = allProjets.findIndex((projet) => {
    if ([0, 50].includes(projet.progression)) return true;
  });

  const projetSelected = allProjets.at(indexOfProjetSelected);
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
