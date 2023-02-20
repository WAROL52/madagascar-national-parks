import { User } from "@/prisma/dto/user/entities/user.entity";

export function GeneraleInfo({ user }: { user: User }) {
  return (
    <div className="card card-flush mb-5 ">
      {/*begin::Card header*/}
      <div className="card-header cursor-pointer text-bg-warning">
        {/*begin::Card title*/}
        <div className="card-title m-0">
          <h3 className="fw-bold m-0">Détails du profile</h3>
        </div>
      </div>
      {/*begin::Card header*/}
      {/*begin::Card body*/}
      <div className="card-body p-9">
        {/*begin::Row*/}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">Nom</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">{user?.nom}</span>
          </div>
          {/*end::Col*/}
        </div>
        {/*end::Row*/}
        {/*begin::Input group*/}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">Prenom</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8 fv-row">
            <span className="fw-semibold text-gray-800 fs-6">
              {user?.prenom}
            </span>
          </div>
          {/*end::Col*/}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">
            Email
            <i
              className="fas fa-exclamation-circle ms-1 fs-7"
              data-bs-toggle="tooltip"
              aria-label="Phone number must be active"
              data-bs-original-title="Phone number must be active"
              data-kt-initialized={1}
            />
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8 d-flex align-items-center">
            <span className="fw-bold fs-6 text-gray-800 me-2">
              {user?.email.email}
            </span>
            <span className="badge badge-success">Verified</span>
          </div>
          {/*end::Col*/}
        </div>
        <div className="row mb-10">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">Sexe</label>
          {/*begin::Label*/}
          {/*begin::Label*/}
          <div className="col-lg-8">
            <span className="fw-semibold fs-6 text-gray-800">{user?.sexe}</span>
          </div>
          {/*begin::Label*/}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">Adresse</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8">
            <a
              href="#"
              className="fw-semibold fs-6 text-gray-800 text-hover-primary"
            >
              {user?.adresse}
            </a>
          </div>
          {/*end::Col*/}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className="row mb-7">
          <label className="col-lg-4 fw-semibold text-muted">
            Date et Lieu de Naissance
            <i
              className="fas fa-exclamation-circle ms-1 fs-7"
              data-bs-toggle="tooltip"
              aria-label="Country of origination"
              data-bs-original-title="Country of origination"
              data-kt-initialized={1}
            />
          </label>
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user?.lieuNaissance && user?.dataNaissance
                ? `${new Date(user?.dataNaissance).toLocaleDateString()} à ${
                    user?.lieuNaissance
                  }`
                : ""}
            </span>
          </div>
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">Télephone</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">
              {user?.tel1 && user?.tel2 && user?.tel1 + " / " + user?.tel2}
            </span>
          </div>
          {/*end::Col*/}
        </div>
        {/*end::Notice*/}
      </div>
      {/*end::Card body*/}
    </div>
  );
}
