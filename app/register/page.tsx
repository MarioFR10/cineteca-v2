"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonVariant } from "../components/button";
import { Typography, TypographyVariant } from "../components/typography";
import { TextField } from "../components/text-field";
import axios from "axios";

export default function Register() {
  const apiURL = "http://localhost:8080";
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function register() {
    try {
      const response = await axios.post(`${apiURL}/register`, {
        username,
        password,
      });

      if (response.status === 200) {
        router.push("/landing");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function goBack() {
    router.back();
  }

  return (
    <div
      className="flex justify-end h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/images/register.jpeg)` }}
    >
      <div className="flex flex-col p-16 space-y-4 rounded-l-3xl bg-blue-200">
        <Typography
          typographyVariant={TypographyVariant.TITLE}
          className="hover:animate-bounce"
        >
          REGISTRARSE
        </Typography>
        <TextField
          label="Usuario"
          initialValue={username}
          setInputValue={setUsername}
        />
        <TextField
          label="Contraseña"
          initialValue={password}
          setInputValue={setPassword}
        />
        <Button
          variant={ButtonVariant.PRIMARY}
          label={"Registrarse"}
          onClick={async () => {
            await register();
          }}
        />
        <Button
          variant={ButtonVariant.PRIMARY}
          label={"Volver"}
          onClick={goBack}
        />
      </div>
    </div>
  );
}
