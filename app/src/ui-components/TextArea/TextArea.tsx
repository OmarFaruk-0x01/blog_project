import { forwardRef, memo } from "react";
import type { TextAreaProps } from "./TextArea.interface";
import clsx from "clsx";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      endIcon,
      startIcon,
      containerClass,
      iconClass,
      value,
      id,
      label,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full font-siliguri">
        {label && (
          <label
            htmlFor={id || ""}
            className="font-siliguri text-sm font-medium text-gray-500"
          >
            {label}
          </label>
        )}
        <div
          className={clsx(
            containerClass,
            "flex w-full items-center justify-start gap-2 rounded border bg-white px-2"
          )}
        >
          {Boolean(startIcon) && (
            <div className={clsx(iconClass)}>{startIcon}</div>
          )}
          <textarea
            {...props}
            ref={ref}
            id={id}
            value={value}
            className={clsx(
              className,
              "text-md text-md h-full w-full border-none py-2 outline-none "
            )}
          ></textarea>
          {Boolean(endIcon) && <div className={clsx(iconClass)}>{endIcon}</div>}
        </div>
      </div>
    );
  }
);

export default memo(TextArea);
