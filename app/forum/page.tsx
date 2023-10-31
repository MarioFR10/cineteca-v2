"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, TypographyVariant } from "../components/typography";
import { Button, ButtonVariant } from "../components/button";
import axios from "axios";

type ForumObjectType = {
  [uuid: string]: {
    uuid: string;
    title: string;
    author: string;
    description: string;
    responses: string[];
  };
};

export default function Forum() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();

  const [forums, setForums] = useState<ForumObjectType>();

  async function loadForums() {
    try {
      const response = await axios.get(`${apiURL}/get-all-forums`);
      return response.data;
    } catch (error) {}
  }

  async function deleteForum(forumUUID: string) {
    try {
      const response = await axios.post(`${apiURL}/delete-forum`, {
        uuid: forumUUID,
      });

      return response.data;
    } catch (error) {}
  }

  function goBack() {
    router.push("/landing");
  }

  useEffect(() => {
    loadForums().then((forumResponse) => {
      setForums(forumResponse);
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-teal-100 p-8">
      <div className="flex flex-row justify-between bg-teal-300 rounded-xl p-6">
        <Typography typographyVariant={TypographyVariant.IMAGE_TITLE}>
          Foros activos!
        </Typography>
        <div className="flex flex-col space-y-2 items-end">
          <Button
            variant={ButtonVariant.FORUM}
            label="Volver"
            onClick={goBack}
          />
          <Button
            variant={ButtonVariant.FORUM}
            label="Crear foro"
            onClick={() => {
              router.push("/add-forum");
            }}
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

      {forums ? (
        <div className="grid grid-cols-4 gap-4 justify-center items-center p-10">
          {Object.entries(forums).map((entry, index) => (
            <div
              className="flex flex-col p-3 bg-teal-500 rounded-xl"
              key={index}
            >
              <Typography typographyVariant={TypographyVariant.BODY}>
                Autor: {entry[1].author}
              </Typography>
              <Typography typographyVariant={TypographyVariant.BODY}>
                Título: {entry[1].title}
              </Typography>
              <Typography typographyVariant={TypographyVariant.BODY}>
                Descripción: {entry[1].description}
              </Typography>
              <Button
                variant={ButtonVariant.FORUM}
                label="Responder foro"
                className="mt-2"
                onClick={() => {
                  router.push(`/forum/${entry[1].uuid}`);
                }}
              />
              <Button
                variant={ButtonVariant.FORUM}
                label="Eliminar foro"
                className="mt-2"
                onClick={async () => {
                  await deleteForum(entry[1].uuid);
                  const newForums = await loadForums();
                  setForums(newForums);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-12">
          <Typography typographyVariant={TypographyVariant.FORUM_TITLE}>
            No se han agregado foros!
          </Typography>
        </div>
      )}
    </div>
  );
}
