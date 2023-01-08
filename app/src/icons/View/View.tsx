import type { FC } from "react";
import type { ViewProps } from "./View.interface";

const View: FC<ViewProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m12 20.175l-7-4.05v-8.1l7-4.05l7 4.05v8.1Zm-1-2.925v-4.6l-4-2.3v4.6Zm2 0l4-2.3v-4.6l-4 2.3ZM1 6V1h5v2H3v3Zm5 17H1v-5h2v3h3Zm12 0v-2h3v-3h2v5Zm3-17V3h-3V1h5v5Zm-9 4.9l4-2.3l-4-2.3l-4 2.3Zm0 1.75Zm0-1.75Zm1 1.75Zm-2 0Z"
      />
    </svg>
  );
};

export default View;
