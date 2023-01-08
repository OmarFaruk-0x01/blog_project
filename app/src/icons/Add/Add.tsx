import type { FC } from "react";
import type { AddProps } from "./Add.interface";

const Add: FC<AddProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
    </svg>
  );
};

export default Add;
