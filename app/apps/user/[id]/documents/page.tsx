import { AppFileBrowser } from "@/app/components/FileManager/AppFileBrowser";
import React from "react";

export default function page() {
  return (
    <>
      <div className="p-3" style={{ height: "500px" }}>
        <form method="POST" action="/api/upload" encType="multipart/form-data">
          <input type="file" name="file" />
          <button type="submit">Upload File</button>
        </form>
      </div>
    </>
  );
}
