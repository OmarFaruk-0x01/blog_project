import type { FC } from "react";
import type { EditProps } from "./Edit.interface";

const Edit: FC<EditProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20.125 15L18 12.875l.725-.725q.275-.275.7-.275q.425 0 .7.275l.725.725q.275.275.275.7q0 .425-.275.7ZM12 21v-2.125l5.3-5.3l2.125 2.125l-5.3 5.3Zm-9-5v-2h7v2Zm0-4v-2h11v2Zm0-4V6h11v2Z"
      />
    </svg>
  );
};

export default Edit;
