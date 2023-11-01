"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, ButtonVariant } from "@/app/components/button";
import { Typography, TypographyVariant } from "@/app/components/typography";
import { TextField } from "@/app/components/text-field";
import { Loader } from "@/app/components/loader";
import axios from "axios";

type ForumDetail = {
  uuid: string;
  title: string;
  author: string;
  description: string;
  responses: string[];
};

export default function ForumDetail() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();
  const params = useParams();

  const [forum, setForum] = useState<ForumDetail>();
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loadForum() {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/get-forum`, {
        uuid: params.uuid,
      });
      return response.data;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function addAnswer() {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiURL}/add-forum-answer`, {
        uuid: params.uuid,
        answer,
      });
      return response.data;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  function goBack() {
    router.push("/forum");
  }

  useEffect(() => {
    loadForum().then((response) => {
      setForum(response);
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-teal-100 p-8">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {forum ? (
            <div className="flex flex-col">
              <div className="flex flex-row justify-between bg-teal-300 rounded-xl p-6">
                <Typography typographyVariant={TypographyVariant.IMAGE_TITLE}>
                  {forum.title}
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
              <div className="flex flex-col mt-12">
                <Typography typographyVariant={TypographyVariant.BODY}>
                  Autor: {forum.author}
                </Typography>
                <div className="flex flex-col">
                  <div className="bg-teal-300 rounded-xl p-6">
                    <Typography typographyVariant={TypographyVariant.BODY}>
                      {forum.description}
                    </Typography>
                  </div>
                  {forum.responses.map((response, index) => (
                    <div
                      key={index}
                      className="mt-3 p-2 rounded-xl bg-teal-200"
                    >
                      <Typography typographyVariant={TypographyVariant.BODY}>
                        {response}
                      </Typography>
                    </div>
                  ))}

                  <div className="mt-4">
                    <TextField
                      initialValue={answer}
                      setInputValue={setAnswer}
                      className="w-full"
                    />
                    <Button
                      variant={ButtonVariant.FORUM}
                      label="Agregar respuesta"
                      onClick={async () => {
                        setAnswer("");
                        await addAnswer();
                        const updatedForum = await loadForum();
                        setForum(updatedForum);
                      }}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>Empty state</>
          )}
        </>
      )}
    </div>
  );
}
