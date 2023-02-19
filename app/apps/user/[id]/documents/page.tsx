import { AppFileBrowser } from "@/app/components/FileManager/AppFileBrowser";
import React from "react";

export default function page() {
  return (
    <>
      <div className="p-3" style={{ height: "500px" }}>
        <AppFileBrowser />
      </div>
    </>
  );
}
