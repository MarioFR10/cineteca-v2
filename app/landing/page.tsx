"use client";
import { useRouter } from "next/navigation";
import { Button, ButtonVariant } from "../components/button";
import { Typography, TypographyVariant } from "../components/typography";
import Image from "next/image";

export default function Landing() {
  const router = useRouter();

  const customStyle = "cursor-pointer hover:animate-spin";

  return (
    <div
      className="flex h-screen p-8"
      style={{ backgroundImage: `url(/images/landing.jpeg)` }}
    >
      <div className="rounded-xl bg-orange-200 p-8">
        <Typography
          typographyVariant={TypographyVariant.LANDING_TITLE}
          className="hover:animate-bounce"
        >
          Apreciación de cine
        </Typography>
        <div className="flex flex-row space-x-10 mt-12 rounded-xl p-4 bg-orange-400">
          <Typography
            typographyVariant={TypographyVariant.OPTION}
            onClick={() => {
              router.push("");
            }}
            className={customStyle}
          >
            Videoteca
          </Typography>
          <Typography
            typographyVariant={TypographyVariant.OPTION}
            onClick={() => {
              router.push("");
            }}
            className={customStyle}
          >
            Fototeca
          </Typography>
          <Typography
            typographyVariant={TypographyVariant.OPTION}
            onClick={() => {
              router.push("");
            }}
            className={customStyle}
          >
            Material Didáctico
          </Typography>
          <Typography
            typographyVariant={TypographyVariant.OPTION}
            onClick={() => {
              router.push("");
            }}
            className={customStyle}
          >
            Foros
          </Typography>
        </div>
        <div className="group relative mt-8">
          <p className="text-amber-950 text-3xl p-4">
            Bienvenidos a Apreciación de Cine!
          </p>
          <p className="absolute inset-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-amber-950 text-lg">
            En este espacio podrán encontrar material didáctivo, información
            referente al curso, noticias, foros y un espacio para compartir sus
            obras con la comunidad del Tecnológico de Costa Rica.
          </p>
        </div>
        <div className="flex flex-col absolute bottom-14">
          <Button
            variant={ButtonVariant.LANDING}
            label={"Editar Usuario"}
            onClick={() => {
              router.push("");
            }}
          />
          <Button
            variant={ButtonVariant.LANDING}
            label={"Cerrar Sesión"}
            onClick={() => {
              router.push("/");
            }}
            className="mt-4"
          />
        </div>
      </div>
      <div className="flex flex-col mt-10 pl-4 space-y-2 w-5/12">
        <div className="flex flex-row space-x-4">
          <Image
            src="/images/eraser-head.jpeg"
            alt="eraser-head"
            height={200}
            width={200}
            onClick={() => {
              window.open(
                "https://www.youtube.com/watch?v=topcofOeXII",
                "_blank"
              );
            }}
            className="cursor-pointer"
          />
          <Image
            src="/images/the-wall.jpg"
            alt="the-wall"
            height={200}
            width={200}
            onClick={() => {
              window.open(
                "https://www.youtube.com/watch?v=yvG3WPYAXHM",
                "_blank"
              );
            }}
            className="cursor-pointer"
          />
          <Image
            src="/images/fantastic.jpg"
            alt="fantastic"
            height={200}
            width={200}
            onClick={() => {
              window.open(
                "https://www.youtube.com/watch?v=lYnyiiyPBPY",
                "_blank"
              );
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <Image
            src="/images/fight-club.jpg"
            alt="fight-club"
            height={200}
            width={200}
            className="cursor-pointer"
          />
          <Image
            src="/images/taxi-driver.jpeg"
            alt="taxi-driver"
            height={200}
            width={200}
            className="cursor-pointer"
          />
          <Image
            src="/images/scarface.jpeg"
            alt="scarface"
            height={200}
            width={200}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
