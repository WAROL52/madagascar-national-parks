import React from "react";

export default function BreadcrumbFolder({
  path,
  openFolder,
}: {
  path: string[];
  openFolder: (folderPathName: string) => void;
}) {
  path = ["/", ...path];
  return (
    <nav
      className="p-3 fw-semibold"
      aria-label="breadcrumb"
      // @ts-ignore
      style={{ "--bs-breadcrumb-divider": "'>'" }}
    >
      <ol className="breadcrumb">
        {path.map((p, index) => (
          <li
            className={`breadcrumb-item ${
              index === path.length - 1 ? "active" : ""
            }`}
            key={index}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (index === path.length - 1) {
                  return;
                }
                openFolder(path.slice(0, index + 1).join("/"));
              }}
            >
              {p}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
