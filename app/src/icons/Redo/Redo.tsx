import { IconProps } from "@interfaces/iconProps";
import type { FC } from "react";
import type { RedoProps } from "./Redo.interface";

const Redo: FC<IconProps> = ({ width = "1em", height = "1em" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="m16 5l5 5l-5 5" />
        <path d="M21 10h-8C7.477 10 3 14.477 3 20v1" />
      </g>
    </svg>
  );
};

export default Redo;
