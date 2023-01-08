import type { FC } from "react";
import type { HeaderProps } from "./Header.interface";
import { useEffect, useState } from "react";
import Nav from "@components/Nav";
import Logo from "@icons/Logo";
import MenuIcon from "@icons/MenuIcon";
import useUiStore, { selectToggleNavbar } from "@store/uiStore";
import clsx from "clsx";
import { Link } from "@remix-run/react";
import Button from "@ui/Button";
import Search from "@icons/Search";

const Header: FC<HeaderProps> = () => {
  const toggleNavbar = useUiStore(selectToggleNavbar);
  const [sticky, setSticky] = useState(false);

  function onScroll(ev: Event) {
    console.dir();
    if (!sticky && window.scrollY > 100) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, []);

  return (
    <>
      <header className={clsx("sticky top-0 z-[50] w-full transition-all ")}>
        <div
          className={`z-[50] flex w-full items-center justify-between  gap-4 bg-white bg-white/30 p-4 backdrop-blur-lg `}
        >
          <Button variant="ghost" texture="ghost">
            <Search />
          </Button>

          <Link to="/">
            <h5 className="relative text-3xl font-bold uppercase text-primary sm:left-5">
              Blog
            </h5>
          </Link>

          <Button
            variant="primary"
            texture="solid"
            className="hidden rounded-xl sm:block"
          >
            Subscribe
          </Button>
          <button className="sm:hidden" onClick={toggleNavbar}>
            <MenuIcon />
          </button>
        </div>
      </header>
      <div className="flex w-full items-center justify-center border-b border-t py-2">
        <Nav />
      </div>
    </>
  );
};

export default Header;
