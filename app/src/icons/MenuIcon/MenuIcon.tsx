import { IconProps } from "@icons/icons.interface";
import type { FC } from "react";

const MenuIcon: FC<IconProps> = ({ height = "1.5em", width = "1.5em" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 18H3v-2h9v2Zm9-5H3v-2h18v2Zm0-5h-9V6h9v2Z"
      />
    </svg>
  );
};

export default MenuIcon;
