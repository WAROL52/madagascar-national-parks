import { FileSchema } from "@/prisma/dto/file-schema/entities/file-schema.entity";
import { Folder } from "@/prisma/dto/folder/entities/folder.entity";
import { AxiosService, FOLDER_SEPARATOR } from "@/tools/axiosService";
import React, { useRef, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import DeleteFileStructure from "./DeleteFileStructure";
import RenameFileStructure from "./RenameFileStructure";

export default function FileComponent({
  folder,
  openFolder,
  fileSchema,
}: {
  folder: Folder;
  openFolder: (folderPathName: string) => void;
  fileSchema: FileSchema;
}) {
  const download = () => {
    const link = document.createElement("a");
    link.href = fileSchema.downloadLink;
    link.download = fileSchema.fileName.split(FOLDER_SEPARATOR).at(-1);
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <div className="col ">
      <button
        className="btn p-0 btn-fileStructure "
        onDoubleClick={download}
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
        ref={target}
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
                      <span className="dropdown-item">Action</span>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item " onClick={download}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-cloud-download"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z" />
                          <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z" />
                        </svg>{" "}
                        Télecharger
                      </a>
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
            <IconFileComponent mymeType={fileSchema.type} />
          </div>
          <div className="card-footer text-truncate">
            <small className="text-muted">
              {fileSchema.fileName.slice(0, 10)}
              {fileSchema.fileName.length > 10 ? "..." : ""}
            </small>
          </div>
        </div>
      </button>
      <Overlay target={target.current} show={show} placement="bottom-start">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {fileSchema.fileName}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}
const IconFileComponent = ({ mymeType }: { mymeType: string }) => {
  const [type, format] = mymeType.split("/");
  const Icon = IconFormat[format] || IconType[type] || FileDefaultIcon;
  return <Icon />;
};
const IconType = {
  image: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      fill="currentColor"
      className="bi bi-file-image-fill"
      viewBox="0 0 16 16"
    >
      <path d="M4 0h8a2 2 0 0 1 2 2v8.293l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm4.002 5.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
      <path d="M10.564 8.27 14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.56 1.536 2.426-3.395z" />
    </svg>
  ),
  video: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      fill="currentColor"
      className="bi bi-file-play-fill"
      viewBox="0 0 16 16"
    >
      <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V5.884z" />
    </svg>
  ),
  text: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      fill="currentColor"
      className="bi bi-file-earmark-font-fill"
      viewBox="0 0 16 16"
    >
      <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.057 6h5.886L11 8h-.5c-.18-1.096-.356-1.192-1.694-1.235l-.298-.01v5.09c0 .47.1.582.903.655v.5H6.59v-.5c.799-.073.898-.184.898-.654V6.755l-.293.01C5.856 6.808 5.68 6.905 5.5 8H5l.057-2z" />
    </svg>
  ),
  application: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={64}
      height={64}
      fill="currentColor"
      className="bi bi-file-earmark-text-fill"
      viewBox="0 0 16 16"
    >
      <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
    </svg>
  ),
  audio: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="bi bi-file-music-fill"
      viewBox="0 0 16 16"
    >
      <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-.5 4.11v1.8l-2.5.5v5.09c0 .495-.301.883-.662 1.123C7.974 12.866 7.499 13 7 13c-.5 0-.974-.134-1.338-.377-.36-.24-.662-.628-.662-1.123s.301-.883.662-1.123C6.026 10.134 6.501 10 7 10c.356 0 .7.068 1 .196V4.41a1 1 0 0 1 .804-.98l1.5-.3a1 1 0 0 1 1.196.98z" />
    </svg>
  ),
};
const IconFormat = {};
const FileDefaultIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="currentColor"
    className="bi bi-file-earmark-fill"
    viewBox="0 0 16 16"
  >
    <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
  </svg>
);
