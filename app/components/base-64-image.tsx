import Image from "next/image";
import { tailwind } from "../utils/styles";

type Props = {
  height: number;
  width: number;
  base64String: string;
  url?: string;
};

export function Base64Image({ height, width, base64String, url }: Props) {
  return (
    <div>
      {base64String && (
        <Image
          src={base64String}
          alt="Imagen"
          height={height}
          width={width}
          className={tailwind("rounded-xl", {
            "cursor-pointer": url,
          })}
          onClick={() => {
            if (url) {
              window.open(url, "_blank");
            }
          }}
        />
      )}
    </div>
  );
}
