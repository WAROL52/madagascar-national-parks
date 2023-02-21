/* eslint-disable react/no-unescaped-entities */
import SaveLoading from "@/app/components/SaveLoading";
import { Email } from "@/prisma/dto/email/entities/email.entity";
import { SiteName, Role } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AddUser({
  showModal,
  onClose,
  addUsers,
}: {
  showModal: boolean;
  onClose: () => void;
  addUsers: (email: Email) => void;
}) {
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isBlurLoading, setBlurLoading] = useState(false);
  const [isEmailUnique, setEmailUnique] = useState(false);
  const [email, setEmail] = useState("");
  const [roleSelected, setRole] = useState<Role>("Admin");
  const [siteSelected, setSiteName] = useState<SiteName>("aucun");
  const handlerBlur = () => {
    if (isEmailValid(email)) {
      setBlurLoading(true);
      axios
        .post("/api/email-handler/find-email", { email })
        .then(({ data }) => {
          setBlurLoading(false);
          const listEmail = data as Email[];
          if (listEmail.length) {
            setEmailUnique(false);
          } else {
            setEmailUnique(true);
          }
        });
    }
  };
  const resetAll = () => {
    setEmail("");
    setShow(false);
    setRole("Admin");
  };
  const handleClose = () => {
    resetAll();
  };
  const handleSave = () => {
    setLoading(true);
    axios
      .post("/api/email-handler/add-email", {
        email,
        role: roleSelected,
        siteName: siteSelected,
      })
      .then(({ data }) => {
        addUsers(data as Email);
        setLoading(false);
        resetAll();
      });
  };
  //   const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(showModal);
  }, [showModal]);
  useEffect(() => {
    if (!show) {
      onClose();
    }
  }, [show, onClose]);
  useEffect(() => {
    const siteN = roleSelected === "ResponsableSite" ? siteSelected : "aucun";
    if (siteN !== siteSelected) {
      setSiteName(siteN);
    }
  }, [roleSelected, siteSelected]);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SaveLoading
            textLoading="Verification en cours..."
            isLoading={isBlurLoading && isEmailValid(email)}
          >
            {isEmailUnique && isEmailValid(email) && "✔ valide"}
            {(!isEmailUnique || !isEmailValid(email)) && "❌ invalide"}
          </SaveLoading>
          <div className="input-group mb-3">
            <span className="input-group-text">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handlerBlur}
              type="text"
              className="form-control"
              placeholder="Entrer la nouvelle adresse email..."
            />
          </div>

          <div className="row">
            <div className="col-md-5">
              <label htmlFor="country" className="form-label">
                Rôle
              </label>
              <select
                className="form-select"
                id="country"
                value={roleSelected}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value={"ResponsableSite"}>ResponsableSite</option>
                <option value={"Admin"}>Admin</option>
                <option value={"SuperAdmin"}>SuperAdmin</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>
            <div className="col-md-5">
              <label htmlFor="country" className="form-label">
                Site
              </label>
              <select
                disabled={roleSelected !== "ResponsableSite"}
                className="form-select"
                id="country"
                value={
                  roleSelected === "ResponsableSite" ? siteSelected : "aucun"
                }
                onChange={(e) => setSiteName(e.target.value as SiteName)}
              >
                {Object.keys(SiteName).map((siteName) => (
                  <option value={siteName} key={siteName}>
                    {siteName}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={isLoading}
            variant="secondary"
            onClick={handleClose}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            disabled={
              isLoading ||
              !isEmailValid(email) ||
              !isEmailUnique ||
              isBlurLoading
            }
            onClick={handleSave}
          >
            <SaveLoading
              textLoading="Sauvegarde en cours..."
              isLoading={isLoading}
            >
              Sauvegarder
            </SaveLoading>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function isEmailValid(email: string) {
  if (!email.includes("@")) return false;
  if (!email.includes(".")) return false;
  return true;
}
