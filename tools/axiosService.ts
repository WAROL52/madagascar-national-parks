import { SuiviDeProjet } from "@/prisma/dto/suivi-de-projet/entities/suivi-de-projet.entity";
import { SiteName } from "@prisma/client";
import axios from "axios";
import { ProjetParsedInterface } from "./SuiviDeProjetHandler";

const post = async function <R>(url: string, data?: any) {
  return await axios.post<R>(url, data).then(({ data }) => data);
};
export class AxiosService {
  static async getSuiviDeProjet(siteName: SiteName) {
    return await post<SuiviDeProjet[]>("/api/tools-suivi/get-one", {
      siteName,
    });
  }
  static async updateDebutReelOfProjet(projetID: number, debutReel: Date) {
    return await post<SuiviDeProjet>("/api/tools-suivi/update-debutReel", {
      id: projetID,
      debutReel,
    });
  }
  static async updateFinReelOfProjet(projetID: number, finReel: Date) {
    return await post<SuiviDeProjet>("/api/tools-suivi/update-finReel", {
      id: projetID,
      finReel,
    });
  }
}
