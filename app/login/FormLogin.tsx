"use client";
import { setUserCookiesClient } from "@/tools/authClient";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
type Inputs = {
  email: string;
  motdepasse: string;
  rememberMe: boolean;
};
export default function FormLogin() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    title: "",
    description: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const res = await axios.post("/api/auth/login", data);
    const dataRes = res.data;
    if (dataRes.hasError) {
      setLoading(false);
      return setError({
        hasError: true,
        title: dataRes.title,
        description: dataRes.description,
      });
    }
    setUserCookiesClient(dataRes);
    setLoading(false);
    return router.push("/apps");
  };
  const router = useRouter();
  return (
    <form className="user" onSubmit={handleSubmit(onSubmit)}>
      {error.hasError && (
        <div className="alert alert-danger" role="alert">
          <h4>{error.title}</h4>
          {error.description}
        </div>
      )}
      <div className="form-group mb-3 ">
        <input
          type="email"
          required
          {...register("email")}
          name="email"
          className="form-control p-2 border rounded-pill"
          id="exampleInputEmail"
          aria-describedby="emailHelp"
          placeholder="Entrer votre adresse e-mail..."
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="password"
          required
          {...register("motdepasse")}
          name="motdepasse"
          className="form-control p-2 border rounded-pill"
          id="exampleInputPassword"
          placeholder="Mot de passe"
        />
      </div>
      <div className="form-group">
        <div className="custom-control custom-checkbox small mb-3">
          <input
            type="checkbox"
            {...register("rememberMe")}
            name="rememberMe"
            className="custom-control-input"
            id="customCheck"
          />
          <label className="custom-control-label" htmlFor="customCheck">
            Se souvenir de moi
          </label>
        </div>
      </div>
      <div className="d-grid gap-2">
        <button
          disabled={isLoading}
          className="btn btn-primary border rounded-pill"
          type="submit"
        >
          Se connecter {isLoading && <Spinner animation="border" size="sm" />}
        </button>
      </div>
      <hr />
      {/* <a href="#" className="btn btn-google btn-user btn-block">
        <i className="fab fa-google fa-fw" /> Connectez-vous avec Google
      </a> */}
    </form>
  );
}
