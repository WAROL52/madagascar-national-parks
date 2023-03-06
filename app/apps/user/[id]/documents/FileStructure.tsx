import { Folder } from "@/prisma/dto/folder/entities/folder.entity";
import React from "react";
import DeleteFileStructure from "./DeleteFileStructure";
import RenameFileStructure from "./RenameFileStructure";

export default function FileStructure({
  folder,
  openFolder,
}: {
  folder: Folder;
  openFolder: (folderPathName: string) => void;
}) {
  return (
    <div className="col ">
      <button
        className="btn p-0 btn-fileStructure "
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-title="Tooltip on top"
        onDoubleClick={() => openFolder(folder.folderPathName)}
      >
        <div className="card h-100 shadow">
          <div className="card-header bg-warning text-end">
            <div className="justify-content-end">
              <div className="btn-group">
                <button
                  className="btn btn-secondary btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul className="dropdown-menu">
                  <div>
                    <li>
                      {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
<a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <RenameFileStructure />
                    </li>
                    <li>
                      <DeleteFileStructure />
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={64}
              height={64}
              fill="currentColor"
              className="bi bi-folder-fill"
              viewBox="0 0 16 16"
            >
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
            </svg>
          </div>
          <div className="card-footer text-truncate">
            <small className="text-muted">{folder.folderName}</small>
          </div>
        </div>
      </button>
    </div>
  );
}
