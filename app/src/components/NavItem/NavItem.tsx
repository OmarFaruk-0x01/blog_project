import type { FC } from "react";
import type { NavItemProps } from "./NavItem.interface";

const NavItem: FC<NavItemProps> = ({ children }) => {
  return (
    <a className="text-md block w-full cursor-pointer rounded px-3 py-1 font-medium hover:bg-primary hover:text-white">
      {children}
    </a>
  );
};

export default NavItem;
