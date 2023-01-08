import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactElement,
  ReactNode,
} from "react";
export type DropDownProps = {
  children: ReactElement[] | ReactElement;
  placeholder: string;
};
export type DropDownItemProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};
