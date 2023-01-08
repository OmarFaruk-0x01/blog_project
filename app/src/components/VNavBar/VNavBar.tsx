import VNavItem from "@components/VNavItem";
import { AdminNavs } from "@helpers/constants";
import type { FC } from "react";
import type { VNavBarProps } from "./VNavBar.interface";

const VNavBar: FC<VNavBarProps> = () => {
  return (
    <div className="flex flex-col gap-2">
      {AdminNavs.map((nav) => (
        <VNavItem {...nav} key={nav.title} />
      ))}
    </div>
  );
};

export default VNavBar;
