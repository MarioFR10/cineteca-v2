"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Typography, TypographyVariant } from "../components/typography";
import { TextField } from "../components/text-field";
import { DropInputArea } from "../components/drop-area";
import { Button, ButtonVariant } from "../components/button";
import { Loader } from "../components/loader";
import axios from "axios";

export default function UploadMaterial() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [url, setURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async function uploadMaterial() {
    if (!selectedFile) {
      return;
    }

    setIsLoading(true);
    try {
      const base64Icon = await toBase64(selectedFile);
      const response = await axios.post(`${apiURL}/upload-material`, {
        uuid: uuidv4(),
        title,
        url,
        base64Icon,
      });

      if (response.status === 200) {
        router.push("/material");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  function handleFileSelected(file: File | null) {
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  }

  function goBack() {
    router.push("/material");
  }

  return (
    <div className="h-screen w-screen bg-cyan-100 p-8">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-row justify-between bg-cyan-300 rounded-xl p-6">
            <Typography typographyVariant={TypographyVariant.MATERIAL_TITLE}>
              Subir Material Didáctico
            </Typography>
            <div className="flex flex-col space-y-2 items-end">
              <Button
                variant={ButtonVariant.MATERIAL}
                label="Volver"
                onClick={goBack}
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

          <div className="flex flex-col space-y-8 w-1/2 mt-10">
            <div>
              <Typography typographyVariant={TypographyVariant.BODY}>
                Titulo
              </Typography>
              <TextField initialValue={title} setInputValue={setTitle} />
            </div>

            <div>
              <Typography typographyVariant={TypographyVariant.BODY}>
                Url del material
              </Typography>
              <TextField initialValue={url} setInputValue={setURL} />
            </div>
            <div>
              <Typography typographyVariant={TypographyVariant.BODY}>
                Icono
              </Typography>
              <DropInputArea fileSelected={handleFileSelected} />
              {selectedFile && (
                <div className="m-4">
                  <Typography typographyVariant={TypographyVariant.BODY}>
                    Archivo seleccionado:
                  </Typography>
                  <Typography typographyVariant={TypographyVariant.BODY}>
                    {selectedFile.name}
                  </Typography>
                </div>
              )}
            </div>
            <Button
              variant={ButtonVariant.MATERIAL}
              label={"Subir Material"}
              onClick={async () => {
                await uploadMaterial();
              }}
              className="mt-10"
            />
          </div>
        </>
      )}
    </div>
  );
}
