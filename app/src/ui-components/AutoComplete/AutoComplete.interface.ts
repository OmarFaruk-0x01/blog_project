import { HTMLAttributes, ReactNode } from "react";
import { clsx, ClassValue } from "clsx";
import { TextInputProps } from "@ui/TextInput/TextInput.interface";

export type AutoCompleteProps<T> = HTMLAttributes<HTMLInputElement> & {
  options: T[];
  value?: T | null;
  values?: T[] | null;
  listContainerClass?: ClassValue;
  listItemClass?: ClassValue;
  textInputClass?: ClassValue;
  textInputProps?: TextInputProps;
  onItemSelect?: (item: T | T[], index?: number) => void;
  getOptionLabel: (item: T) => ReactNode;
  getFilterLabel: (item: T, inputValue: string) => boolean;
  enableCreateNew?: boolean;
  onCreateNew?: (label: string) => T | Promise<T> | void;
  loading?: boolean;
};
