import React from "react";
import { Spinner } from "react-bootstrap";

export default function SaveLoading({
  children,
  textLoading = children,
  isLoading,
}: {
  textLoading?: React.ReactNode;
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <>
      {!isLoading && children}
      {isLoading && (
        <>
          <Spinner animation="border" size="sm" />
          {textLoading}
        </>
      )}
    </>
  );
}
