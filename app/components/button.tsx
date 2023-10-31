import { useCallback } from "react";
import { tailwind } from "../utils/styles";

export enum ButtonVariant {
  PRIMARY = "PRIMARY",
  LANDING = "LANDING",
  IMAGE = "IMAGE",
  FORUM = "FORUM",
  EDIT_USER = "EDIT_USER",
}

type CustomButtonProps = {
  variant: ButtonVariant;
  label: string;
  className?: string;
  onClick?: () => any;
};

type ButtonProps = CustomButtonProps & JSX.IntrinsicElements["button"];

const defaultButtonClassName =
  "w-fit h-fit px-8 py-2 whitespace-nowrap rounded-lg font-semibold text-md cursor-pointer transition duration-200 ease-in-out";

const commonVariantClassNames: { [key in ButtonVariant]: string } = {
  [ButtonVariant.PRIMARY]: `${defaultButtonClassName} text-black shadow-lg`,
  [ButtonVariant.LANDING]: `${defaultButtonClassName} text-black shadow-lg`,
  [ButtonVariant.IMAGE]: `${defaultButtonClassName} text-black shadow-lg`,
  [ButtonVariant.FORUM]: `${defaultButtonClassName} text-black shadow-lg`,
  [ButtonVariant.EDIT_USER]: `${defaultButtonClassName} text-black shadow-lg`,
};

const variantClassNames: { [key in ButtonVariant]: string } = {
  [ButtonVariant.PRIMARY]: `${
    commonVariantClassNames[ButtonVariant.PRIMARY]
  } bg-purple-400 hover:bg-purple-600`,
  [ButtonVariant.LANDING]: `${
    commonVariantClassNames[ButtonVariant.LANDING]
  } bg-amber-400 hover:bg-amber-600`,
  [ButtonVariant.IMAGE]: `${
    commonVariantClassNames[ButtonVariant.IMAGE]
  } bg-green-400 hover:bg-green-600`,
  [ButtonVariant.FORUM]: `${
    commonVariantClassNames[ButtonVariant.FORUM]
  } bg-teal-400 hover:bg-teal-600`,
  [ButtonVariant.EDIT_USER]: `${
    commonVariantClassNames[ButtonVariant.EDIT_USER]
  } bg-fuchsia-400 hover:bg-fuchsia-600`,
};

export function Button({
  variant,
  label,
  className,
  onClick,
  ...buttonProps
}: ButtonProps) {
  const variantClassName = variantClassNames[variant];

  const handleOnClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={tailwind(variantClassName, className)}
      {...buttonProps}
    >
      <div className="flex flex-row items-center justify-center">{label}</div>
    </button>
  );
}
