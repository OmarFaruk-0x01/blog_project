import { IconProps } from "@interfaces/iconProps";
import type { FC } from "react";
import type { HighlightProps } from "./Highlight.interface";

const Highlight: FC<IconProps> = ({ width = "1em", height = "1em" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 2048 2048"
    >
      <path
        fill="currentColor"
        d="M2048 0v512q-87 0-149 19t-105 55t-70 82t-41 105t-19 120t-5 129q0 66 2 131t3 127h-256v384l-768 384v-768H384q0-62 2-127t3-131q0-66-5-129t-19-120t-40-104t-70-83t-106-54T0 512V0h128v384h1792V0h128zm-768 1280H768v561l512-256v-305zm256-128q0-45-1-88t-1-86q0-64 5-126t20-120t46-114t82-106H361q51 51 81 106t46 114t21 120t5 126q0 43-1 86t-1 88h1024z"
      />
    </svg>
  );
};

export default Highlight;
