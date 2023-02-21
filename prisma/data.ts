// import xlsx from "xlsx";
/* it is safe to import the library from the top level */
import fs from "node:fs";
import xlsx, { readFile, utils, set_fs, read } from "xlsx";
/* it is not safe to import 'fs' from the top level ! */
// import * as fs from 'fs'; // this will fail
import { join } from "path";
import { cwd } from "process";

// export async function getServerSideProps() {
//     // ...
// }
// const workB = xlsx.readFile("./data2.xlsx");
function log_all_cells(ws) {
  const data = [];
  var range = utils.decode_range(ws["!ref"]);
  var dense = ws["!data"] != null; // test if sheet is dense
  for (var R = 0; R <= range.e.r; ++R) {
    const row = [];
    for (var C = 0; C <= range.e.c; ++C) {
      var cell = dense
        ? ws["!data"]?.[R]?.[C]
        : ws[utils.encode_cell({ r: R, c: C })];
      // console.log(R, C, cell);
      row.push([R, C, cell]);
    }
    data.push(row);
  }
  return data;
}
export async function getDataExcelSuiviTools() {
  // set_fs(await import("fs")); // dynamically import 'fs' when needed
  const data = fs.readFileSync(join(cwd(), "", "./prisma/data2.xlsx"));
  // const wb = readFile(join(cwd(), "", "./prisma/data2.xlsx"), {
  const wb = read(data, { dense: true });
  // bookDeps: true,
  // bookProps: true,
  // bookFiles: true,
  // cellStyles: true,
  // cellText: true,
  // dense: true,; // works
  const workSheet = {};

  for (const sheetName of wb.SheetNames) {
    const workS = wb.Sheets[sheetName]; //utils.sheet_to_eth(wb.Sheets[sheetName]);
    workSheet[sheetName] = log_all_cells(workS);
    workS;
  }
  return workSheet;
}
export async function getDataExcelSuiviToolsToHTML() {
  // set_fs(await import("fs")); // dynamically import 'fs' when needed
  const wb = readFile(join(cwd(), "", "./prisma/data2.xlsx")); // works
  const workSheet = {};
  for (const sheetName of wb.SheetNames) {
    workSheet[sheetName] = utils.sheet_to_html(wb.Sheets[sheetName]);
  }
  return workSheet;
}
