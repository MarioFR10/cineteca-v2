"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, TypographyVariant } from "./components/typography";
import { IconButton, InputAdornment } from "@mui/material";
import { TextField } from "./components/text-field";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, ButtonVariant } from "./components/button";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function navToRegister() {
    router.push("/register");
  }

  return (
    <div
      className="flex justify-end h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/images/login.jpeg')` }}
    >
      <div className="flex flex-col p-16 rounded-l-3xl bg-rose-100 w-1/3">
        <Typography
          typographyVariant={TypographyVariant.TITLE}
          className="hover:animate-bounce"
        >
          CINETECA
        </Typography>
        <TextField
          label="Nombre de usuario"
          initialValue={username}
          setInputValue={setUsername}
          className="mt-4"
        />
        <TextField
          label="Contraseña"
          initialValue={password}
          setInputValue={setPassword}
          showPassword={showPassword}
          inputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="mt-4"
        />
        <Button
          variant={ButtonVariant.PRIMARY}
          label={"Iniciar sesión"}
          onClick={() => {
            router.push("/landing");
          }}
          className="mt-4"
        />
        <Typography typographyVariant={TypographyVariant.BODY} className="mt-8">
          ¿No tienes cuenta?
        </Typography>
        <Button
          variant={ButtonVariant.PRIMARY}
          label={"Registrarse"}
          onClick={navToRegister}
          className="mt-2"
        />
      </div>
    </div>
  );
}
