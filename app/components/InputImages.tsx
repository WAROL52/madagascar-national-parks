"use client";
import { getUserCookiesClient } from "@/tools/authClient";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import {
  ImageListType,
  ImageType,
  ImageUploadingPropsType,
} from "react-images-uploading/dist/typings";
import { InputUserPrifileSettingType } from "../apps/user/[id]/parametres/FormUserPrifileSetting";

export function InputImages({
  register,
  defaultSrc,
}: {
  register: UseFormRegister<InputUserPrifileSettingType>;
  defaultSrc: string;
}) {
  const [images, setImages] = React.useState<ImageType[]>([]);
  const maxNumber = 69;
  const user=getUserCookiesClient()
  // const onChange: ImageUploadingPropsType["onChange"] =

  return (
    <div className="App">
      <ImageUploading
        multiple={false}
        value={images}
        //@ts-ignore
        onChange={(value: any) => {
          // data for submit
          console.log(value);
          setImages(value);
        }}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        {...register("avatar")}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            {!imageList.length ? (
              <>
                <img className="img-thumbnail" width="75%" src={defaultSrc} />
                <div className="font-weight-bold">{user.nom}</div>
                <span className="text-black-50 badge">{user.email.email}</span>
              </>
            ) : (
              ""
            )}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img
                  className="img-thumbnail"
                  width="75%"
                  src={image["data_url"]}
                />
                <span className="font-weight-bold">RABETSY Rolio</span>
                <span className="text-black-50 badge">raberolio@gmail.com</span>
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Modifier</button>
                  <button onClick={() => onImageRemove(index)}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Cliquez ou déposez ici
            </button>
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
