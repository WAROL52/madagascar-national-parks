"use client";
import { AppFileBrowser } from "@/app/components/FileManager/AppFileBrowser";
import LoadingComponent from "@/app/components/LoadingComponent";
import SaveLoading from "@/app/components/SaveLoading";
import { Folder } from "@/prisma/dto/folder/entities/folder.entity";
import { getUserCookiesClient } from "@/tools/authClient";
import { AxiosService } from "@/tools/axiosService";
import React, { use, useState, useEffect, FormEvent } from "react";
import { Modal } from "react-bootstrap";
import BreadcrumbFolder from "./BreadcrumbFolder";
import FileComponent from "./FileComponent";
import FileStructure from "./FileStructure";
import FolderComponent from "./FolderComponent";
import TeleverserUnFichier from "./TeleverserUnFichier";
export type OpenFolderType = (folderPathName: string) => void;
export default function FileSysteme() {
  // const folderRoot = use(AxiosService.getFolderRoot());
  const user = getUserCookiesClient();
  const [folderRoot, setFolderRoot] = useState<Folder>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [newFolderLoading, setNewFolderLoading] = useState(false);
  const [showCreateNewFolder, setShowCreateNewFolder] = useState(false);
  const [openFolderLoading, setOpenFolderLoading] = useState(true);
  const handleClose = () => [
    setShowCreateNewFolder(false),
    setNewFolderName(""),
  ];
  const handlerNewFolderName = (e) => {
    let folderName = e.target.value as string;
    ["/"].map((char) => {
      folderName = folderName.replaceAll(char, "");
    });
    setNewFolderName(folderName);
  };
  const handlerCreateNewFolder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");

    setNewFolderLoading(true);
    AxiosService.createNewFolder(folderRoot, newFolderName).then((folder) => {
      setFolderRoot(folder);
      setNewFolderLoading(false);
      handleClose();
    });
  };
  const pathRoot =
    user.email.role === "ResponsableSite"
      ? `/Sites/${user?.email?.siteName}`
      : "/";
  const openFolder: OpenFolderType = async (folderPathName: string) => {
    if (!folderPathName.startsWith(pathRoot)) return;
    setOpenFolderLoading(true);
    const folder = await AxiosService.openFolder(folderPathName);
    setFolderRoot(folder);
    setOpenFolderLoading(false);
  };
  useEffect(() => {
    openFolder(pathRoot);
  }, [pathRoot]);

  console.log(folderRoot);

  return (
    <>
      <div className="p-3">
        <div className="container text-bg-light border shadow">
          <div className="row">
            <div className="col">
              <BreadcrumbFolder
                path={(folderRoot?.folderPathName || "")
                  .split("/")
                  .filter((p) => p)}
                openFolder={openFolder}
              />
            </div>
            <div className="col text-end fw-semibold">
              <button
                type="button"
                className="btn btn-light mt-2 px-3"
                onClick={() => setShowCreateNewFolder(true)}
                disabled={user.email.role === "ResponsableSite"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  className="bi bi-folder-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                  <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
                </svg>{" "}
                Créer un dossier
              </button>

              <TeleverserUnFichier
                folder={folderRoot}
                openFolder={openFolder}
                setFolderRoot={setFolderRoot}
              />
            </div>
          </div>
          <div
            className="d-flex flex-wrap justify-content-start gap-4  p-3 overflow-auto border-top"
            style={{ height: "600px" }}
          >
            {openFolderLoading && <LoadingComponent />}
            {!openFolderLoading &&
              folderRoot &&
              folderRoot.folderChilds.map((folder, index) => (
                <FolderComponent
                  key={index}
                  folder={folder}
                  openFolder={openFolder}
                />
              ))}
            {!openFolderLoading &&
              folderRoot &&
              folderRoot.fileChilds.map((file, index) => (
                <FileComponent
                  key={index}
                  folder={folderRoot}
                  fileSchema={file}
                  openFolder={openFolder}
                />
              ))}
          </div>
        </div>
      </div>
      <div>
        <Modal show={showCreateNewFolder} onHide={handleClose}>
          <form action="" method="post" onSubmit={handlerCreateNewFolder}>
            <Modal.Header className=" text-bg-warning" closeButton>
              <h1 className="modal-title fs-5 ">Nouveau dossier</h1>
            </Modal.Header>
            <Modal.Body>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    className="bi bi-folder-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                    <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nouveau dossier..."
                  aria-label="dossier"
                  aria-describedby="basic-addon1"
                  name="newFolderName"
                  required
                  value={newFolderName}
                  onChange={handlerNewFolderName}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="reset"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
                disabled={newFolderLoading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={newFolderLoading}
              >
                <SaveLoading
                  isLoading={newFolderLoading}
                  textLoading="Enregistrement..."
                >
                  Enregistrer
                </SaveLoading>
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
}
