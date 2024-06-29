import clsx from "clsx";

import cn from "./style.module.scss";

const Size = {
  default: "text--md",
  sm: "text--sm",
  md: "text--md",
  lg: "text--lg",
  xl: "text--xl",
  ["2xl"]: "text--2xl",
};

const Boldness = {
  default: "text--normal",
  lower: "text--lower",
  normal: "text--normal",
  semibold: "text--semibold",
  bold: "text--bold",
};

function Text({
  children,
  size = Size.default,
  boldness = Boldness.default,
  style,
}) {
  return (
    <span className={clsx(cn["text"], cn[size], cn[boldness])} style={style}>
      {children}
    </span>
  );
}

export { Text, Size, Boldness };
