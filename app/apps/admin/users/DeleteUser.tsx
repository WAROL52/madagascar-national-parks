/* eslint-disable react/no-unescaped-entities */
import SaveLoading from "@/app/components/SaveLoading";
import { Email } from "@/prisma/dto/email/entities/email.entity";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export default function DeleteUser({
  showModal,
  onClose,
  deleteUsers,
  userSelected,
}: {
  userSelected: Email;
  showModal: boolean;
  onClose: () => void;
  deleteUsers: (email: Email) => void;
}) {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    setShow(showModal);
  }, [showModal]);
  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show, onClose]);
  const handlerDeleteEmail = () => {
    setLoading(true);
    axios
      .post("/api/email-handler/delete-email", { email: userSelected.email })
      .then(({ data }) => {
        setLoading(false);
        setShow(false);
        deleteUsers(data);
      });
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Suppression d'email!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Voulez vous vraiment supprimer cette email:{" "}
          <Badge>`{userSelected.email}`</Badge> ?
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            variant="danger"
            disabled={isLoading}
            onClick={handlerDeleteEmail}
          >
            <SaveLoading
              textLoading="Suppression en cours..."
              isLoading={isLoading}
            >
              Supprimer
            </SaveLoading>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
