import { IconProps } from "@interfaces/iconProps";
import type { FC } from "react";
import type { RightAlignProps } from "./RightAlign.interface";

const RightAlign: FC<IconProps> = ({ width = "1em", height = "1em" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"
      />
    </svg>
  );
};

export default RightAlign;
