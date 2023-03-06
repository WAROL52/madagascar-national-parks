import { FileSchema } from "@/prisma/dto/file-schema/entities/file-schema.entity";
import { Folder } from "@/prisma/dto/folder/entities/folder.entity";
import { SuiviDeProjet } from "@/prisma/dto/suivi-de-projet/entities/suivi-de-projet.entity";
import { SiteName } from "@prisma/client";
import axios from "axios";
import { GoogleDriveOptionType } from "./googleDriveService";
import { ProjetParsedInterface } from "./SuiviDeProjetHandler";

const post = async function <R>(url: string, data?: any) {
  return await axios.post<R>(url, data).then(({ data }) => data);
};
export const FOLDER_SEPARATOR = "⫻";
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
  static async updateFinReelOfProjet(projetID: number, finReel: Date | null) {
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
  static async createOneFileToFolder(
    folderParent: Folder,
    file: {
      fileName: string;
      googleDriveID: string;
      type: string;
      downloadLink: string;
    }
  ) {
    const body = { folderParent, file };
    return await post<Folder>("/api/system-file/create-file", body);
  }
  static async uploadFile(folderParent: Folder, file: File) {
    const formData = new FormData();
    // const b = f.slice();
    const folderPathName = folderParent.folderPathName.replaceAll(
      "/",
      FOLDER_SEPARATOR
    );
    const newFile = new File(
      [file],
      `${folderPathName}${
        folderPathName === FOLDER_SEPARATOR ? "" : FOLDER_SEPARATOR
      }${file.name}`,
      {
        type: file.type,
        lastModified: file.lastModified,
      }
    );
    formData.append("file", newFile);
    try {
      const res = await axios.post<GoogleDriveOptionType["fields"]>(
        "/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const folder = await AxiosService.createOneFileToFolder(folderParent, {
        fileName: file.name,
        googleDriveID: res.data.id,
        type: file.type,
        downloadLink: res.data.webContentLink,
      });
      return folder;
    } catch (err) {
      console.error(err);
    }
  }
  static async downloadFile(fileSchema: FileSchema) {
    return await post<string>("/api/download", {
      googleDriveID: fileSchema.googleDriveID,
    });
  }
}
