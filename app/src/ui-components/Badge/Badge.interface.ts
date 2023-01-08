import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from "react";
export type BadgeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  label?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: "success" | "error" | "warning" | "info" | "primary" | "secondary";
};
