import { tailwind } from "../utils/styles";

export enum TypographyVariant {
  LANDING_TITLE = "LANDING_TITLE",
  IMAGE_TITLE = "IMAGE_TITLE",
  FORUM_TITLE = "FORUM_TITLE",
  TITLE = "TITLE",
  BODY = "BODY",
  OPTION = "OPTION",
  HELPER = "HELPER",
}

type VariantStyle = {
  colorClassName?: string;
  styleClassName?: string;
  component: keyof JSX.IntrinsicElements;
  className?: string;
};

const commonStylesClassName = "";
const variants: { [key in TypographyVariant]: VariantStyle } = {
  [TypographyVariant.LANDING_TITLE]: {
    component: "h1",
    className: `${commonStylesClassName} font-semibold text-6xl`,
    colorClassName: "text-orange-950",
  },
  [TypographyVariant.IMAGE_TITLE]: {
    component: "h1",
    className: `${commonStylesClassName} font-semibold text-6xl`,
    colorClassName: "text-green-950",
  },
  [TypographyVariant.FORUM_TITLE]: {
    component: "h1",
    className: `${commonStylesClassName} font-semibold text-6xl`,
    colorClassName: "text-teal-950",
  },
  [TypographyVariant.TITLE]: {
    component: "h1",
    className: `${commonStylesClassName} font-semibold text-3xl`,
    colorClassName: "text-violet-950",
  },
  [TypographyVariant.BODY]: {
    component: "p",
    className: `${commonStylesClassName} font-normal text-lg`,
    colorClassName: "text-black",
  },
  [TypographyVariant.OPTION]: {
    component: "p",
    className: `${commonStylesClassName} font-semibold text-2xl`,
    colorClassName: "text-black",
  },
  [TypographyVariant.HELPER]: {
    component: "p",
    className: `${commonStylesClassName} font-normal text-md`,
    colorClassName: "text-gray-600",
  },
};

type TypographyProps = {
  typographyVariant: TypographyVariant;
  customColorClassName?: string;
  className?: string;
};

type HtmlSvgElement = React.HTMLAttributes<HTMLElement | SVGElement>;
type Props = TypographyProps & HtmlSvgElement;

export function Typography({
  typographyVariant,
  customColorClassName,
  className,
  ...other
}: Props) {
  const {
    colorClassName: variantColorClassName,
    className: variantClassName,
    component: Component,
  }: VariantStyle = variants[typographyVariant];

  return (
    <Component
      className={tailwind(
        variantClassName,
        variantColorClassName,
        customColorClassName && customColorClassName,
        className
      )}
      {...other}
    />
  );
}
