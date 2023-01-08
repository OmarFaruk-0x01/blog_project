import { IconProps } from "@interfaces/iconProps";
import type { FC } from "react";
import type { UndoProps } from "./Undo.interface";

const Undo: FC<IconProps> = ({ width = "1em", height = "1em" }) => {
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
        <path d="m8 5l-5 5l5 5" />
        <path d="M3 10h8c5.523 0 10 4.477 10 10v1" />
      </g>
    </svg>
  );
};

export default Undo;
