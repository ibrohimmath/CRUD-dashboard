import clsx from "clsx";

import cn from "./style.module.scss";

const Type = {
  default: "button--primary",
  primary: "button--primary",
  secondary: "button--secondary",
};

function Button({ submit, type = Type.default, children, style }) {
  if (submit) {
    return (
      <button
        type="submit"
        className={clsx(cn["button"], cn[type])}
        style={style}
      >
        {children}
      </button>
    );
  }
  return (
    <button className={clsx(cn["button"], cn[type])} style={style}>
      {children}
    </button>
  );
}

export { Button, Type };
