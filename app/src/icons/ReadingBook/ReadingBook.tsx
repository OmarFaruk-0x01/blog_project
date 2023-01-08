import { IconProps } from "@icons/icons.interface";
import type { FC } from "react";

const ReadingBook: FC<IconProps> = ({ height = "1em", width = "1em" }) => {
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
        d="M1920 256v1664H0V256h256V128h384q88 0 169 27t151 81q69-54 150-81t170-27h384v128h256zm-640 0q-70 0-136 23t-120 69v1254q59-33 124-49t132-17h256V256h-256zM384 1536h256q67 0 132 16t124 50V348q-54-45-120-68t-136-24H384v1280zm-256 256h806q-32-31-65-54t-68-40t-75-25t-86-9H256V384H128v1408zM1792 384h-128v1280h-384q-46 0-85 8t-75 25t-69 40t-65 55h806V384z"
      />
    </svg>
  );
};

export default ReadingBook;
