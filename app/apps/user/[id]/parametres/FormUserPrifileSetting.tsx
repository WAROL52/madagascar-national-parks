"use client";

import { InputImages } from "@/app/components/InputImages";
import { UpdateUserDto } from "@/prisma/dto/user/dto/update-user.dto";
import { User } from "@/prisma/dto/user/entities/user.entity";
import { getUserCookiesClient, setUserCookiesClient } from "@/tools/authClient";
import { getAvatarUser } from "@/tools/tools";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReglageProfile } from "./ReglageProfile";
import { ReglageRoleAdmin } from "./ReglageRoleAdmin";
export type InputUserPrifileSettingType = User;
export function FormUserPrifileSetting() {
  const [isLoading, setLoading] = useState(false);
  const userLogin = getUserCookiesClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputUserPrifileSettingType>();
  const onSubmit: SubmitHandler<InputUserPrifileSettingType> = async (data) => {
    setLoading(true);
    data.dataNaissance = data.dataNaissance || null;
    const res = await axios.post("/api/user-handler/update-user", {
      ...data,
      id: userLogin?.id,
    });
    const dataRes = res.data as User;
    setUserCookiesClient(dataRes);
    setLoading(false);
    router.refresh();
  };
  const user = getUserCookiesClient();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-3 border-right text-bg-warning">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <InputImages
                register={register}
                defaultSrc={getAvatarUser(user.avatar, user.sexe)}
              />
            </div>
          </div>
          <div className="col-md-5 border-right">
            <ReglageProfile register={register} />
          </div>
          <div className="col-md-4">
            <ReglageRoleAdmin register={register} />
          </div>
        </div>
        <div className=" text-center border-top py-5 ">
          <button
            disabled={isLoading}
            className="btn btn-secondary profile-button mx-3 px-5"
            type="reset"
          >
            Annuler
          </button>
          <button
            disabled={isLoading}
            className="btn btn-primary profile-button mx-3 px-5"
            type="submit"
          >
            Enregistrer le profil{" "}
            {isLoading && <Spinner animation="border" size="sm" />}
          </button>
        </div>
      </form>
    </>
  );
}
