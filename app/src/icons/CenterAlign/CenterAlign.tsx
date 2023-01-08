import { IconProps } from "@interfaces/iconProps";
import type { FC } from "react";
import type { CenterAlignProps } from "./CenterAlign.interface";

const CenterAlign: FC<IconProps> = ({ width = "1em", height = "1em" }) => {
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
        d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"
      />
    </svg>
  );
};

export default CenterAlign;
