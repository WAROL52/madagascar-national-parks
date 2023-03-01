"use client";
import axios from "axios";
import { log } from "console";
import { useRouter } from "next/navigation";
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { setUserCookiesClient } from "@/tools/authClient";
import { Email } from "@/prisma/dto/email/entities/email.entity";

type Inputs = {
  email: string;
  nom: string;
  prenom: string;
  motdepasse: string;
  motdepasseRepeate: string;
};
export default function FormRegister() {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const res = await axios.post("/api/auth/register", data);
    const dataRes = res.data;
    if (dataRes.hasError) {
      if (dataRes.type == 1) {
        return router.push("/register-refused");
      }
      return router.push("/register-refused2");
    } else {
      setUserCookiesClient(dataRes.User);
      router.push(`/apps/user/${dataRes.User.id}/apercue`);
      return router.refresh();
    }
  }; // watch input value by passing the name of it
  return (
    <form className="user needs-validation  " onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row mb-3">
        <div className="col-sm-6  mb-sm-0">
          <input
            {...register("nom")}
            type="text"
            minLength={2}
            required
            name="nom"
            className="form-control  border rounded-pill"
            id="exampleFirstName"
            placeholder="Nom"
          />
        </div>
        <div className="col-sm-6">
          <input
            {...register("prenom")}
            type="text"
            minLength={2}
            required
            name="prenom"
            className="form-control border rounded-pill"
            id="exampleLastName"
            placeholder="Prenom"
          />
        </div>
      </div>
      <div className="form-group mb-3">
        <input
          {...register("email")}
          type="email"
          required
          name="email"
          className="form-control border rounded-pill"
          id="exampleInputEmail"
          placeholder="Adresse e-mail"
        />
      </div>
      <div className="form-group row mb-3">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            {...register("motdepasse")}
            type="password"
            required
            new-password="true"
            minLength={6}
            className="form-control border rounded-pill"
            id="exampleInputPassword"
            placeholder="Mot de passe"
          />
        </div>
        <div className="col-sm-6">
          <input
            {...register("motdepasseRepeate")}
            type="password"
            new-password="true"
            required
            minLength={6}
            className="form-control border rounded-pill"
            id="exampleRepeatPassword"
            placeholder="Répéter le mot de passe"
          />
          <div className="invalid-feedback">
            mots de passe ne correspondent pas
          </div>
        </div>
      </div>
      <div className="d-grid gap-2">
        <button
          disabled={isLoading}
          className="btn btn-primary border rounded-pill"
          type="submit"
        >
          Créer un compte{" "}
          {isLoading && <Spinner animation="border" size="sm" />}
        </button>
      </div>
      <hr />
      <a href="#" className="btn btn-google btn-user btn-block">
        <i className="fab fa-google fa-fw" />
        S'inscrire avec un compte Google
      </a>
    </form>
  );
}
