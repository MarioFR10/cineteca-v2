"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Typography, TypographyVariant } from "../components/typography";
import { TextField } from "../components/text-field";
import { Button, ButtonVariant } from "../components/button";
import axios from "axios";

export default function UploadImage() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  async function uploadForum() {
    const response = await axios.post(`${apiURL}/upload-forum`, {
      uuid: uuidv4(),
      title,
      author,
      description,
      responses: [],
    });

    if (response.status === 200) {
      router.push("/forum");
    }
  }

  function goBack() {
    router.back();
  }

  return (
    <div className="h-screen w-screen bg-teal-100 p-8">
      <div className="flex flex-row justify-between bg-teal-300 rounded-xl p-6">
        <Typography typographyVariant={TypographyVariant.FORUM_TITLE}>
          Crear foro!
        </Typography>
        <div className="flex flex-col space-y-2 items-end">
          <Button
            variant={ButtonVariant.FORUM}
            label="Volver"
            onClick={goBack}
          />
          <Button
            variant={ButtonVariant.FORUM}
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
            Descripción
          </Typography>
          <TextField
            initialValue={description}
            setInputValue={setDescription}
            className="w-full"
          />
        </div>
        <Button
          variant={ButtonVariant.FORUM}
          label={"Subir foro"}
          onClick={async () => {
            await uploadForum();
          }}
          className="mt-10"
        />
      </div>
    </div>
  );
}
