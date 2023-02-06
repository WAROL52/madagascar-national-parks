// import xlsx from "xlsx";
/* it is safe to import the library from the top level */
import xlsx, { readFile, utils, set_fs } from "xlsx";
/* it is not safe to import 'fs' from the top level ! */
// import * as fs from 'fs'; // this will fail
import { join } from "path";
import { cwd } from "process";

// export async function getServerSideProps() {
//     // ...
// }
// const workB = xlsx.readFile("./data2.xlsx");

export async function testData() {
  set_fs(await import("fs")); // dynamically import 'fs' when needed
  const wb = readFile(join(cwd(), "", "./prisma/data2.xlsx")); // works
  for (const sheetName of wb.SheetNames) {
    console.log(sheetName);
  }
  console.log("back");
}
