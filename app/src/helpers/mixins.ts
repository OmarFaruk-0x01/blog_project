import clsx from "clsx";

export const flexView: (align?: string, justify?: string) => string = (
  align = "center",
  justify = "center"
) => clsx("flex", `items-${align}`, `justify-${justify}`);
