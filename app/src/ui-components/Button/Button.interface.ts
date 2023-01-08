import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  active?: boolean;
  texture?: "solid" | "outline" | "ghost";
  variant?:
    | "success"
    | "error"
    | "warning"
    | "info"
    | "primary"
    | "secondary"
    | "normal"
    | "ghost";
};
