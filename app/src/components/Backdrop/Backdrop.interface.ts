import { ClassValue } from "clsx";

export type BackdropProps = {
  active: boolean;
  onClick?: () => void;
  className?: ClassValue;
};
