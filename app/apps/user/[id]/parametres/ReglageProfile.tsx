import { getUserCookiesClient } from "@/tools/authClient";
import { UseFormRegister } from "react-hook-form";
import { InputUserPrifileSettingType } from "./FormUserPrifileSetting";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function ReglageProfile({
  register,
}: {
  register: UseFormRegister<InputUserPrifileSettingType>;
}) {
  const user = getUserCookiesClient();
  const date = new Date(user.dataNaissance);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.getMonth().toString().padStart(2, "0");
  const year = date.getFullYear();
  const dateNaissance = `${year}-${month}-${day}`;
  return (
    <>
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-right">Réglages de profil</h4>
        </div>
        <div className="row mt-2 mb-3">
          <div className="col-md-6">
            <label className="labels">Nom</label>
            <input
              type="text"
              className="form-control"
              placeholder="Votre nom..."
              {...register("nom")}
              required
              defaultValue={user?.nom}
            />
          </div>
          <div className="col-md-6">
            <label className="labels">Prenom</label>
            <input
              type="text"
              className="form-control"
              placeholder="votre prenom..."
              {...register("prenom")}
              required
              defaultValue={user?.prenom}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 mb-3">
            <label className="labels">Télephone 1</label>
            <input
              type="text"
              className="form-control"
              placeholder="Entrez votre numéro de téléphone..."
              defaultValue={user?.tel1 || ""}
              {...register("tel1")}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="labels">Télephone 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="Entrez votre numéro de téléphone..."
              defaultValue={user?.tel2 || ""}
              {...register("tel2")}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="labels">Adresse</label>
            <input
              type="text"
              className="form-control"
              placeholder="Entrer votre adresse exacte..."
              {...register("adresse")}
              defaultValue={user?.adresse || ""}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="labels">Date de naissance</label>
            <input
              type="date"
              className="form-control"
              placeholder="Votre date de naissance..."
              {...register("dataNaissance")}
              defaultValue={dateNaissance}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="labels">Lieu de naissance</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter address line 2"
              {...register("lieuNaissance")}
              defaultValue={user?.lieuNaissance || ""}
            />
          </div>
          <div className="mb-3">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio1"
                defaultValue={"Homme"}
                {...register("sexe")}
                defaultChecked={user?.sexe == "Homme"}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Homme
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id="inlineRadio2"
                defaultValue="Femme"
                {...register("sexe")}
                required
                defaultChecked={user?.sexe == "Femme"}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Femme
              </label>
            </div>
          </div>

          <div className="col-md-12">
            <label className="labels">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Entrez des paragraphes qui sera afficher sur votre profile..."
              defaultValue={user?.description || ""}
              {...register("description")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
