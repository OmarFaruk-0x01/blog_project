import type { FC } from "react";
import type { SearchProps } from "./Search.interface";

const Search: FC<SearchProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <circle cx="14" cy="14" r="12" />
        <path d="m23 23l7 7" />
      </g>
    </svg>
  );
};

export default Search;
