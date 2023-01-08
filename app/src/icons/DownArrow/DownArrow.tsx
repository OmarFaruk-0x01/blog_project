import clsx from "clsx";
import type { FC } from "react";
import type { DownArrowProps } from "./DownArrow.interface";

const DownArrow: FC<DownArrowProps> = ({ className, size = "md" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      className={clsx(
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
        },
        className
      )}
    >
      <path
        fill="currentColor"
        d="m11.3 14.3l-2.6-2.6q-.475-.475-.212-1.087Q8.75 10 9.425 10h5.15q.675 0 .937.613q.263.612-.212 1.087l-2.6 2.6q-.15.15-.325.225q-.175.075-.375.075t-.375-.075q-.175-.075-.325-.225Z"
      />
    </svg>
  );
};

export default DownArrow;
