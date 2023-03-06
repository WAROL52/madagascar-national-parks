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
  const pathQG = "/QG";
  const pathPublic = "/Public";
  const pathHome = "/";
  const pathRoot =
    user.email.role === "ResponsableSite"
      ? `/Sites/${user?.email?.siteName}`
      : pathHome;
  const canCreateNewFolder =
    user.email.role === "ResponsableSite" &&
    (folderRoot?.folderPathName || pathRoot).startsWith(pathQG);

  async function openFolder(folderPathName: string): Promise<void> {
    if (
      [pathRoot, pathPublic, pathQG].find((path) =>
        folderPathName.startsWith(path)
      )
    ) {
      setOpenFolderLoading(true);
      const folder = await AxiosService.openFolder(folderPathName);
      setFolderRoot(folder);
      setOpenFolderLoading(false);
    }
  }
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
              <button
                type="button"
                className={
                  "btn btn-light mt-2 px-3 btn-sm " +
                  (folderRoot?.folderPathName === pathRoot ? "active" : "")
                }
                onClick={() => openFolder(pathRoot)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                  className="bi bi-house "
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                </svg>
              </button>
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
                className={
                  "btn btn-light mt-2 px-3 btn-sm " +
                  (folderRoot?.folderPathName === pathPublic ? "active" : "")
                }
                onClick={() => openFolder(pathPublic)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-globe"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                </svg>{" "}
                Public
              </button>
              <button
                type="button"
                className={
                  "btn btn-light mt-2 px-3 btn-sm " +
                  (folderRoot?.folderPathName === pathQG ? "active" : "")
                }
                onClick={() => openFolder(pathQG)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-star"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                </svg>{" "}
                QG
              </button>
              <button
                type="button"
                className="btn btn-light mt-2 px-3 btn-sm"
                onClick={() => setShowCreateNewFolder(true)}
                disabled={canCreateNewFolder}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="This top tooltip is themed via CSS variables."
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
                Nouveau {JSON.stringify(canCreateNewFolder)}
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
