import type { FC } from "react";
import type { SpinProps } from "./Spin.interface";

const Spin: FC<SpinProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      className="animate-spin"
    >
      <g fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Z"
          clip-rule="evenodd"
          opacity=".2"
        />
        <path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z" />
      </g>
    </svg>
  );
};

export default Spin;
