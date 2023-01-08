import Backdrop from "@components/Backdrop";
import ArrowRight from "@icons/ArrowRight";
import FilterCircle from "@icons/FilterCircle";
import Search from "@icons/Search";
import uiStore, {
  selectSidebarOpen,
  selectToggleSearchbar,
  selectToggleSidebar,
} from "@store/uiStore";
import TextInput from "@ui/TextInput";
import clsx from "clsx";
import type { FC } from "react";
import type { SideBarProps } from "./SideBar.interface";

const SideBar: FC<SideBarProps> = ({ children }) => {
  const sidebarOpen = uiStore(selectSidebarOpen);
  const sidebarToggle = uiStore(selectToggleSidebar);

  return (
    <>
      {/* <Backdrop
        active={sidebarOpen}
        onClick={sidebarToggle}
        className="sm:opacity-0"
      /> */}
      <div
        className={clsx(
          {
            ["translate-x-0"]: sidebarOpen,
            ["translate-x-[100%] sm:translate-x-0"]: !sidebarOpen,
          },
          "fixed top-0 right-0 z-sidebar flex h-full w-1/2 flex-col bg-white p-5 shadow-lg transition-all duration-500 sm:relative sm:w-[300px] sm:shadow-none"
        )}
      >
        <button
          className={clsx(
            "absolute top-4 -left-10 rounded-full bg-primary p-2 text-white shadow-md shadow-primary transition-all duration-500 sm:hidden",
            {
              ["top-5 -left-4 text-sm"]: sidebarOpen,
              ["text-xs  shadow-none"]: !sidebarOpen,
            }
          )}
          onClick={sidebarToggle}
        >
          {sidebarOpen ? <ArrowRight /> : <FilterCircle />}
        </button>
        {children}
      </div>
    </>
  );
};

export default SideBar;
