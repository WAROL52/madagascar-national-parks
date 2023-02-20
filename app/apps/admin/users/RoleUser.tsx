import SaveLoading from "@/app/components/SaveLoading";
import { Email } from "@/prisma/dto/email/entities/email.entity";
import { Site } from "@/prisma/dto/site/entities/site.entity";
import { User } from "@/prisma/dto/user/entities/user.entity";
import { Role, SiteName } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";

export function RoleUser({
  email,
  updateUser,
}: {
  email: Email;
  updateUser: (email: Email) => void;
}) {
  const [roleSelected, setRole] = useState<typeof email.role>(email.role);
  const [siteSelected, setSiteName] = useState<SiteName>(email.siteName);
  const [isLoading, setLoading] = useState(false);
  const handlerSave = () => {
    setLoading(true);
    axios
      .post("/api/email-handler/update-email", {
        email: email.email,
        role: roleSelected,
        siteName: siteSelected,
      })
      .then(({ data }) => {
        setLoading(false);
        updateUser(data as Email);
      });
  };
  useEffect(() => {
    const siteN = roleSelected === "ResponsableSite" ? siteSelected : "aucun";
    if (siteN !== siteSelected) {
      setSiteName(siteN);
    }
  }, [roleSelected, siteSelected]);
  return (
    <Card className="text-center">
      <Card.Header>Option de rôle</Card.Header>
      <Card.Body>
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
      </Card.Body>
      <Card.Footer className="text-muted">
        <div className=" text-start">
          <button
            disabled={isLoading}
            type="button"
            className="btn btn-outline-warning me-2"
            onClick={() => setRole(email.role)}
          >
            Annuler
          </button>
          <button
            disabled={
              isLoading ||
              (roleSelected === email.role && siteSelected === email.siteName)
            }
            type="button"
            className="btn btn-primary"
            onClick={handlerSave}
          >
            <SaveLoading
              textLoading="Sauvegarde en cours..."
              isLoading={isLoading}
            >
              Sauvegarder
            </SaveLoading>
          </button>
        </div>
      </Card.Footer>
    </Card>
  );
}
