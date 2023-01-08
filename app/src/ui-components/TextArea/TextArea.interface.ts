import type {
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";
export type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  containerClass?: string;
  iconClass?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  value?: string;
  label?: string;
};
