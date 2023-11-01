"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Typography, TypographyVariant } from "../components/typography";
import { TextField } from "../components/text-field";
import { DropInputArea } from "../components/drop-area";
import { Button, ButtonVariant } from "../components/button";
import axios from "axios";

export default function UploadVideo() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

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

  async function uploadVideo() {
    if (!selectedFile) {
      return;
    }

    const base64Video = await toBase64(selectedFile);
    const response = await axios.post(`${apiURL}/upload-video`, {
      uuid: uuidv4(),
      title,
      author,
      base64Video,
    });

    if (response.status === 200) {
      router.push("/video");
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
    router.push("/video");
  }

  return (
    <div className="h-screen w-screen bg-rose-100 p-8">
      <div className="flex flex-row justify-between bg-rose-300 rounded-xl p-6">
        <Typography typographyVariant={TypographyVariant.VIDEO_TITLE}>
          Subir Video
        </Typography>
        <div className="flex flex-col space-y-2 items-end">
          <Button
            variant={ButtonVariant.VIDEO}
            label="Volver"
            onClick={goBack}
          />
          <Button
            variant={ButtonVariant.VIDEO}
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
            Autor
          </Typography>
          <TextField initialValue={author} setInputValue={setAuthor} />
        </div>
        <div>
          <Typography typographyVariant={TypographyVariant.BODY}>
            Video
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
          variant={ButtonVariant.VIDEO}
          label={"Subir Video"}
          onClick={async () => {
            await uploadVideo();
          }}
          className="mt-10"
        />
      </div>
    </div>
  );
}
