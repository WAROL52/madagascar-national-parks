import { Folder } from "@/prisma/dto/folder/entities/folder.entity";
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
  static async getAllSuiviDeProjet() {
    return await post<SuiviDeProjet[]>("/api/tools-suivi/get-all");
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
  static async getFolderRoot() {
    return await post<Folder>("/api/system-file/folder-root");
  }
  static async createNewFolder(folderParent: Folder, newFolderName: string) {
    type BodyType = {
      folderName: string;
      folderPathName: string;
      folderParentPathName: string;
    };
    const body: BodyType = {
      folderName: newFolderName,
      folderParentPathName: folderParent.folderPathName,
      folderPathName: `${
        folderParent.folderPathName === "/" ? "" : folderParent.folderPathName
      }/${newFolderName}`,
    };
    return await post<Folder>("/api/system-file/create-folder", body);
  }
  static async openFolder(folderPathName: string) {
    type BodyType = {
      folderPathName: string;
    };
    const body: BodyType = { folderPathName };
    return await post<Folder>("/api/system-file/open-folder", body);
  }
}
