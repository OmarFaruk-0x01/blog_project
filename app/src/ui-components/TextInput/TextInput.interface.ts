import { DetailedHTMLProps, ReactNode, InputHTMLAttributes } from "react";

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  containerClass?: string;
  iconClass?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  value?: string;
  label?: string;
  enableForm?: boolean;
};
