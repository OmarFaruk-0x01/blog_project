import clsx from "clsx";
import type { FC } from "react";
import type { BadgeProps } from "./Badge.interface";

const Badge: FC<BadgeProps> = ({
  endIcon,
  label,
  startIcon,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={clsx(
        "flex w-fit items-center justify-center gap-2 rounded-md px-3 py-[4px] text-sm font-medium",
        {
          "bg-primary-10 text-primary": variant === "success",
          "text-yellow bg-yellow-100": variant === "warning",
          "bg-red-100 text-red-500": variant === "error",
          "bg-cyan-100 text-cyan-500": variant === "info",
          "bg-primary text-white": variant === "primary",
          "bg-slate-500 text-white": variant === "secondary",
        }
      )}
      {...props}
    >
      {Boolean(startIcon) && startIcon}
      <span>{label}</span>
      {Boolean(endIcon) && endIcon}
    </button>
  );
};

export default Badge;
