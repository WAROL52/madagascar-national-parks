"use client";

import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";

const rows: GridRowsProp = Array.from({ length: 30 }).map((_, index) => {
  return {
    id: index,
    site: "site" + index,
    email: index + "raberolio@gmail.com",
  };
});
const headerClassName = "text-bg-dark";
const columns: GridColDef[] = [
  {
    field: "site",
    headerName: "Site",
    width: 150,
    headerClassName,
  },
  { field: "email", headerName: "Email", width: 200, headerClassName },
];

export default function App() {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
