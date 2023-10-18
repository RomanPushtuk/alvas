"use client";
import { FC, PropsWithChildren, useTransition } from "react";

type ButtonProps = {
  onClick: (event: any) => void;
} & PropsWithChildren;

const Button: FC<ButtonProps> = ({ onClick, children }) => {
  const [pending, startTransition] = useTransition();
  return (
    <input
      type="button"
      onClick={(e) => {
        startTransition(() => {
          onClick(e);
        });
      }}
      value={"Кнопка"}
    />
  );
};

export default Button;
