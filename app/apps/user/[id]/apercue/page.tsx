/* eslint-disable react/no-unescaped-entities */
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { id: +params.id },
    include: { email: true },
  });

  const values = Object.values(user as object);
  const isCompleted = !!values.find((v) => v == null);
  return (
    <>
      <div className="card card-flush mb-5 ">
        {/*begin::Card header*/}
        <div className="card-header cursor-pointer text-bg-warning">
          {/*begin::Card title*/}
          <div className="card-title m-0">
            <h3 className="fw-bold m-0">Détails du profil</h3>
          </div>
          {/*end::Card title*/}
          {/*begin::Action*/}
          <Link
            href={`/apps/user/${params.id}/parametres`}
            className="btn btn-sm btn-primary align-self-center"
          >
            Modifier mon profil
          </Link>
          {/*end::Action*/}
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
              <span className="fw-semibold fs-6 text-gray-800">
                {user?.sexe}
              </span>
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
            {/*begin::Label*/}
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
            {/*end::Label*/}
            {/*begin::Col*/}
            <div className="col-lg-8">
              <span className="fw-bold fs-6 text-gray-800">
                {user?.lieuNaissance &&
                  user?.dataNaissance &&
                  user?.lieuNaissance + "à" + user?.dataNaissance}
              </span>
            </div>
            {/*end::Col*/}
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
          {!isCompleted && (
            <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed  p-6">
              {/*begin::Icon*/}
              {/*begin::Svg Icon | path: icons/duotune/general/gen044.svg*/}
              <span className="svg-icon svg-icon-2tx svg-icon-warning me-4">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    opacity="0.3"
                    x={2}
                    y={2}
                    width={20}
                    height={20}
                    rx={10}
                    fill="currentColor"
                  />
                  <rect
                    x={11}
                    y={14}
                    width={7}
                    height={2}
                    rx={1}
                    transform="rotate(-90 11 14)"
                    fill="currentColor"
                  />
                  <rect
                    x={11}
                    y={17}
                    width={2}
                    height={2}
                    rx={1}
                    transform="rotate(-90 11 17)"
                    fill="currentColor"
                  />
                </svg>
              </span>
              {/*end::Svg Icon*/} {/*end::Icon*/}
              {/*begin::Wrapper*/}
              <div className="d-flex flex-stack flex-grow-1 ">
                {/*begin::Content*/}
                <div className=" fw-semibold">
                  <h4 className="text-gray-900 fw-bold">Votre Attentions!</h4>
                  <div className="fs-6 text-gray-700 ">
                    Quelques informations sur vous sont encore vides. Veuillez
                    les compléter dans le{" "}
                    <Link
                      className="fw-bold"
                      href={`/apps/user/${params.id}/parametres`}
                    >
                      paramètre
                    </Link>
                    .
                  </div>
                </div>
                {/*end::Content*/}
              </div>
              {/*end::Wrapper*/}
            </div>
          )}
          {/*end::Notice*/}
        </div>
        {/*end::Card body*/}
      </div>
    </>
  );
}
