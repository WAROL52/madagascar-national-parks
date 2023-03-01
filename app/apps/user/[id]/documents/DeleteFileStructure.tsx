/* eslint-disable react/no-unescaped-entities */
import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";

export default function DeleteFileStructure() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a className="dropdown-item link-danger" onClick={handleShow}>
        Suprimer
      </a>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="text-bg-danger">
          <Modal.Title>Suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vous voulez vraiment supprimer cet élément? L'action est irréversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
