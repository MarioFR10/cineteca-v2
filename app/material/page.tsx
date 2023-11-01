"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, TypographyVariant } from "../components/typography";
import { Base64Image } from "../components/base-64-image";
import { Button, ButtonVariant } from "../components/button";
import axios from "axios";

type MaterialObjectType = {
  [uuid: string]: {
    uuid: string;
    title: string;
    url: string;
    base64Icon: string;
  };
};

export default function Materials() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();

  const [material, setMaterial] = useState<MaterialObjectType>();

  async function loadMaterial() {
    try {
      const response = await axios.get(`${apiURL}/get-all-material`);
      return response.data;
    } catch (error) {}
  }

  async function deleteMaterial(materialUUID: string) {
    try {
      const response = await axios.post(`${apiURL}/delete-material`, {
        uuid: materialUUID,
      });

      return response.data;
    } catch (error) {}
  }

  function goBack() {
    router.push("/landing");
  }

  useEffect(() => {
    loadMaterial().then((materialResponse) => {
      setMaterial(materialResponse);
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-cyan-100 p-8">
      <div className="flex flex-row justify-between bg-cyan-300 rounded-xl p-6">
        <Typography typographyVariant={TypographyVariant.MATERIAL_TITLE}>
          Material Didáctico
        </Typography>
        <div className="flex flex-col space-y-2 items-end">
          <Button
            variant={ButtonVariant.MATERIAL}
            label="Volver"
            onClick={goBack}
          />
          <Button
            variant={ButtonVariant.MATERIAL}
            label="Subir Material"
            onClick={() => {
              router.push("/upload-material");
            }}
          />
          <Button
            variant={ButtonVariant.MATERIAL}
            label="Cerrar Sesión"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      </div>

      {material && Object.entries(material).length !== 0 ? (
        <div className="grid grid-cols-4 gap-4 justify-center items-center p-10">
          {Object.entries(material).map((entry, index) => {
            return (
              <div className="flex flex-col space-y-4 items-center" key={index}>
                <Typography typographyVariant={TypographyVariant.BODY}>
                  Título: {entry[1].title}
                </Typography>
                <Base64Image
                  key={entry[0]}
                  base64String={entry[1].base64Icon}
                  url={entry[1].url}
                  height={200}
                  width={200}
                />
                <Button
                  variant={ButtonVariant.MATERIAL}
                  label="Eliminar material"
                  onClick={async () => {
                    await deleteMaterial(entry[1].uuid);
                    const newMaterial = await loadMaterial();
                    setMaterial(newMaterial);
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-12">
          <Typography typographyVariant={TypographyVariant.MATERIAL_TITLE}>
            No se ha subido material didáctico!
          </Typography>
        </div>
      )}
    </div>
  );
}
