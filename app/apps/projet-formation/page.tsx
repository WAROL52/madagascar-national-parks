import TableFormation from "@/app/components/TableFormation";
import React from "react";

export default function page() {
  return (
    <>
      <div className="bg-dark text-secondary px-1 py-4 text-center">
        <div className="py-3">
          <h1 className="display-5 fw-bold text-white">Suivi De Formation</h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4"></p>
            {/* <div className="d-none gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
              >
                Custom button
              </button>
              <button
                type="button"
                className="btn btn-outline-light btn-lg px-4"
              >
                Secondary
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <TableFormation />
    </>
  );
}
