"use client";
import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";

export function AppsMenu({
  title,
  children,
}: {
  title: string | React.ReactNode;
  children: React.ReactNode;
}) {
  const id = Math.random();
  return (
    <>
      <div>
        <button
          className="btn btn-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#collapse-" + id}
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          {title}
        </button>
        <div className="collapse" id={"collapse-" + id}>
          <div className="card card-body text-bg-dark">{children}</div>
        </div>
      </div>
    </>
  );
}
