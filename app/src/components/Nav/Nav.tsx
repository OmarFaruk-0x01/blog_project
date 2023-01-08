import NavItem from "@components/NavItem";
import Button from "@ui/Button";
import Close from "@icons/Close";
import Logo from "@icons/Logo";
import useUiStore, { selectNavOpen, selectToggleNavbar } from "@store/uiStore";
import { FC, useState } from "react";
import type { NavProps } from "./Nav.interface";
import { clsx } from "clsx";
import { Link } from "@remix-run/react";

const Nav: FC<NavProps> = () => {
  const open = useUiStore(selectNavOpen);
  const toggleNavbar = useUiStore(selectToggleNavbar);
  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 z-sidebar flex h-full w-2/3 flex-col items-center justify-start bg-white  p-2 opacity-100 transition-all duration-500 sm:relative sm:p-0 md:w-full md:flex-row md:justify-center",
        { ["-translate-x-[100%] opacity-0 sm:translate-x-0"]: !open }
      )}
    >
      <div className="flex items-center justify-between gap-5 p-5 sm:hidden">
        <Logo />
        <button
          className="absolute top-5 right-5 text-black sm:hidden"
          onClick={toggleNavbar}
        >
          <Close />
        </button>
      </div>
      <ul className="flex w-full flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-center">
        <li>
          <Link to="/">
            <Button texture="ghost" className="font-semibold">
              Home
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/books">
            <Button texture="ghost" className="font-semibold">
              Books
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/topics">
            <Button texture="ghost" className="font-semibold">
              Topics
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
