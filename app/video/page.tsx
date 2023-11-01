"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, TypographyVariant } from "../components/typography";
import { Base64Video } from "../components/base-64-video";
import { Button, ButtonVariant } from "../components/button";
import axios from "axios";

type VideoObjectType = {
  [uuid: string]: {
    uuid: string;
    author: string;
    title: string;
    base64Video: string;
  };
};

export default function Videos() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();

  const [videos, setVideos] = useState<VideoObjectType>();

  async function loadVideos() {
    try {
      const response = await axios.get(`${apiURL}/get-all-videos`);
      return response.data;
    } catch (error) {}
  }

  async function deleteVideo(videoUUID: string) {
    try {
      const response = await axios.post(`${apiURL}/delete-video`, {
        uuid: videoUUID,
      });

      return response.data;
    } catch (error) {}
  }

  function goBack() {
    router.push("/landing");
  }

  useEffect(() => {
    loadVideos().then((videosResponse) => {
      setVideos(videosResponse);
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-rose-100 p-8">
      <div className="flex flex-row justify-between bg-rose-300 rounded-xl p-6">
        <Typography typographyVariant={TypographyVariant.VIDEO_TITLE}>
          Videoteca
        </Typography>
        <div className="flex flex-col space-y-2 items-end">
          <Button
            variant={ButtonVariant.VIDEO}
            label="Volver"
            onClick={goBack}
          />
          <Button
            variant={ButtonVariant.VIDEO}
            label="Subir video"
            onClick={() => {
              router.push("/upload-video");
            }}
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

      {videos && Object.entries(videos).length !== 0 ? (
        <div className="grid grid-cols-4 gap-4 justify-center items-center p-10">
          {Object.entries(videos).map((entry, index) => (
            <div
              className="flex flex-col p-3 bg-rose-500 rounded-xl items-center"
              key={index}
            >
              <Typography typographyVariant={TypographyVariant.BODY}>
                Autor: {entry[1].author}
              </Typography>
              <Typography typographyVariant={TypographyVariant.BODY}>
                Título: {entry[1].title}
              </Typography>
              <Base64Video key={entry[0]} base64String={entry[1].base64Video} />
              <Button
                variant={ButtonVariant.VIDEO}
                label="Eliminar video"
                className="mt-2"
                onClick={async () => {
                  await deleteVideo(entry[1].uuid);
                  const updatedVideos = await loadVideos();
                  setVideos(updatedVideos);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-12">
          <Typography typographyVariant={TypographyVariant.VIDEO_TITLE}>
            No se han subido videos!
          </Typography>
        </div>
      )}
    </div>
  );
}
