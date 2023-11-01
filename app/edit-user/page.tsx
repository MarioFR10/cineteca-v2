"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, TypographyVariant } from "../components/typography";
import { Button, ButtonVariant } from "../components/button";
import { TextField } from "../components/text-field";
import { Loader } from "../components/loader";
import axios from "axios";

export default function EditUser() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();

  const [user, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function editUser() {
    setIsLoading(true);
    try {
      const response = await axios.put(`${apiURL}/edit-user`, {
        user,
        password,
      });

      if (response.data.isModified) {
        setIsLoading(false);
        router.push("/landing");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  function goBack() {
    router.push("/landing");
  }

  return (
    <div className="h-screen w-screen bg-fuchsia-100 p-8">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-row justify-between bg-fuchsia-300 rounded-xl p-6">
            <Typography typographyVariant={TypographyVariant.EDIT_USER_TITLE}>
              Modificar usuarios!
            </Typography>
            <div className="flex flex-col space-y-2 items-end">
              <Button
                variant={ButtonVariant.EDIT_USER}
                label="Volver"
                onClick={goBack}
              />
              <Button
                variant={ButtonVariant.EDIT_USER}
                label="Cerrar Sesión"
                onClick={() => {
                  router.push("/");
                }}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-10 w-1/2">
            <div>
              <Typography typographyVariant={TypographyVariant.BODY}>
                Nombre:
              </Typography>
              <TextField initialValue={user} setInputValue={setUsername} />
            </div>
            <div>
              <Typography typographyVariant={TypographyVariant.BODY}>
                Contraseña:
              </Typography>
              <TextField initialValue={password} setInputValue={setPassword} />
            </div>

            <Button
              variant={ButtonVariant.PRIMARY}
              label={"Modificar Datos"}
              onClick={async () => {
                await editUser();
              }}
              className="mt-8"
            />
          </div>
        </>
      )}
    </div>
  );
}
