import Image from "next/image";

type Props = {
  height: number;
  width: number;
  base64String: string;
  url?: string;
};

export function DisplayBase64Image({ height, width, base64String }: Props) {
  return (
    <div>
      {base64String && (
        <Image
          src={base64String}
          alt="Imagen"
          height={height}
          width={width}
          className="rounded-xl"
        />
      )}
    </div>
  );
}
