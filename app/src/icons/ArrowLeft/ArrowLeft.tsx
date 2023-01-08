import { IconProps } from "@icons/icons.interface";
import type { FC } from "react";
import type { ArrowLeftProps } from "./ArrowLeft.interface";

const ArrowLeft: FC<IconProps> = ({ width = "1em", height = "1em" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1024 1024"
      className='rotate-180'
    >
      <path
        
        fill="currentColor"
        d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"
      />
    </svg>
  );
};

export default ArrowLeft;
