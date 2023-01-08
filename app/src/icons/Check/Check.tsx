import { IconProps } from "@interfaces/iconProps";
import type { FC } from "react";
import type { CheckProps } from "./Check.interface";

const Check: FC<IconProps> = ({ width = "1em", height = "1em" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M104 196a12.2 12.2 0 0 1-8.5-3.5l-56-56a12 12 0 0 1 17-17L104 167L207.5 63.5a12 12 0 0 1 17 17l-112 112a12.2 12.2 0 0 1-8.5 3.5Z"
      />
    </svg>
  );
};

export default Check;
