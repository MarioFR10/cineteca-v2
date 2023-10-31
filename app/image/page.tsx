"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, TypographyVariant } from "../components/typography";
import { DisplayBase64Image } from "../components/base-64-image";
import { Button, ButtonVariant } from "../components/button";
import axios from "axios";

type ImageObjectType = {
  [uuid: string]: {
    uuid: string;
    author: string;
    title: string;
    base64Image: string;
  };
};

export default function Images() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();

  const [images, setImages] = useState<ImageObjectType>();

  async function loadImages() {
    try {
      const response = await axios.get(`${apiURL}/get-all-images`);
      return response.data;
    } catch (error) {}
  }

  async function deleteImage(imageUUID: string) {
    try {
      const response = await axios.post(`${apiURL}/delete-image`, {
        uuid: imageUUID,
      });

      return response.data;
    } catch (error) {}
  }

  function goBack() {
    router.back();
  }

  useEffect(() => {
    loadImages().then((imagesResponse) => {
      setImages(imagesResponse);
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-green-100 p-8">
      <div className="flex flex-row justify-between bg-green-300 rounded-xl p-6">
        <Typography typographyVariant={TypographyVariant.IMAGE_TITLE}>
          Fototeca
        </Typography>
        <div className="flex flex-col space-y-2 items-end">
          <Button
            variant={ButtonVariant.IMAGE}
            label="Volver"
            onClick={goBack}
          />
          <Button
            variant={ButtonVariant.IMAGE}
            label="Subir foto"
            onClick={goBack}
          />
          <Button
            variant={ButtonVariant.IMAGE}
            label="Cerrar Sesión"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      </div>

      {images && Object.entries(images).length !== 0 ? (
        <div className="flex flex-row justify-between p-10">
          {Object.entries(images).map((entry, index) => {
            return (
              <div className="flex flex-col space-y-4" key={index}>
                <DisplayBase64Image
                  key={entry[0]}
                  base64String={entry[1].base64Image}
                  height={200}
                  width={200}
                />
                <Typography typographyVariant={TypographyVariant.BODY}>
                  Autor:{entry[1].author}
                </Typography>
                <Typography typographyVariant={TypographyVariant.BODY}>
                  Título:{entry[1].title}
                </Typography>
                <Button
                  variant={ButtonVariant.IMAGE}
                  label="Eliminar foto"
                  onClick={async () => {
                    await deleteImage(entry[1].uuid);
                    const newImgs = await loadImages();
                    setImages(newImgs);
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-12">
          <Typography typographyVariant={TypographyVariant.IMAGE_TITLE}>
            No se han subido imagenes!
          </Typography>
        </div>
      )}
    </div>
  );
}
