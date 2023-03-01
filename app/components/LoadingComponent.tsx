import React from "react";

export default function LoadingComponent() {
  return (
    <>
      <div>
        <div
          className="spinner-border spinner-border-sm text-warning shadow"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        Chargement...
      </div>
    </>
  );
}
