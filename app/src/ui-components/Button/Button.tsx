import type { FC } from "react";
import type { ButtonProps } from "./Button.interface";
import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const _button = cva(
  "rounded-md py-2 px-3 font-siliguri font-medium transition-colors duration-300 text-start",
  {
    variants: {
      variant: {
        warning: "text-yellow bg-yellow-100",
        error: "",
        info: "",
        success: "",
        primary: "",
        secondary: "",
        normal: "",
        ghost: "",
      },
      texture: {
        solid:
          "border-0 disabled:bg-gray-50 disabled:hover:bg-gray-50 disabled:active:bg-gray-50  disabled:text-gray-200 ",
        outline:
          "border-[1px] bg-white disabled:bg-gray-50 disabled:hover:bg-gray-50 disabled:active:bg-gray-50  disabled:text-gray-200 ",
        ghost:
          "border-0 bg-transparent transition-all disabled:bg-gray-50 disabled:hover:bg-gray-50 disabled:active:bg-gray-50  disabled:text-gray-200 ",
      },
      active: {
        true: "",
      },
    },
    compoundVariants: [
      {
        variant: "error",
        active: true,
        texture: "solid",
        className: " border-red-100 bg-red-500 text-white",
      },
      {
        variant: "error",
        active: false,
        texture: "solid",
        className:
          "bg-red-100 text-red-500 hover:bg-red-500/30 active:bg-red-600/40",
      },
      {
        variant: "error",
        active: false,
        texture: "outline",
        className:
          "bg-white text-red-500 border-red-500  hover:text-white hover:bg-red-500 active:bg-red-600",
      },
      {
        variant: ["success", "primary", "normal"],
        active: true,
        texture: "solid",
        className:
          "bg-primary border-primary  hover:bg-primary/50 active:bg-primary-65 text-white",
      },
      {
        variant: "success",
        active: false,
        texture: "solid",
        className:
          "bg-primary-100 text-primary hover:bg-primary-100/60 active:bg-primary-200/60",
      },
      {
        variant: "primary",
        active: false,
        texture: "solid",
        className:
          "bg-primary-100 text-primary hover:bg-primary-100/60 active:bg-primary-200/60",
      },
      {
        variant: "info",
        active: true,
        texture: "solid",
        className:
          "bg-cyan-500 border-cyan-500  hover:bg-cyan-500/20 active:bg-cyan-600/50 text-white",
      },
      {
        variant: "info",
        active: false,
        texture: "solid",
        className:
          "bg-cyan-100 text-cyan-500 hover:bg-cyan-500/20 active:bg-cyan-600/50",
      },
      {
        variant: "normal",
        active: false,
        texture: "solid",
        className: "bg-zinc-100  hover:bg-zinc-500/20 active:bg-zinc-600/30",
      },
      {
        variant: "normal",
        active: false,
        texture: "ghost",
        className: "hover:bg-zinc-500/20 active:bg-zinc-600/30",
      },
      {
        variant: "normal",
        active: true,
        texture: "ghost",
        className: "text-primary",
      },
    ],
    defaultVariants: {
      variant: "normal",
      active: false,
      texture: "solid",
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      startIcon,
      endIcon,
      active,
      texture,
      variant,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(_button({ className, active, texture, variant }), {
          "flex items-center gap-2": Boolean(startIcon) || Boolean(endIcon),
          "justify-between": Boolean(endIcon),
        })}
        {...props}
      >
        {Boolean(startIcon) && startIcon}
        {Boolean(children) && <span>{children}</span>}
        {Boolean(endIcon) && endIcon}
      </button>
    );
  }
);

export default Button;
