import type { FC } from "react";
import type { RootLayoutProps } from "./RootLayout.interface";
import Header from "@components/Header";
import SideBar from "@components/SideBar";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "@remix-run/react";

const RootLayout: FC<RootLayoutProps> = ({
  children,
  sidebar,
  sidebarDirection = "left",
  noHeader,
}) => {
  return (
    <div className="h-screen">
      {!noHeader && <Header />}
      <div
        className={clsx("grid grid-flow-col", {
          "grid-cols-[auto_1fr]":
            sidebarDirection === "left" && Boolean(sidebar),
          "grid-cols-[1fr_auto]":
            sidebarDirection === "right" && Boolean(sidebar),
          "grid-cols-1": !Boolean(sidebar),
        })}
      >
        <div
          className={clsx("relative", {
            "order-1": sidebarDirection === "left" && Boolean(sidebar),
            "order-2": sidebarDirection === "right" && Boolean(sidebar),
            hidden: !Boolean(sidebar),
          })}
        >
          {/* <div className="absolute right-0 top-0 z-30 h-full w-[.05em] bg-gradient-to-t from-transparent via-zinc-200 to-transparent" /> */}
          <SideBar>{sidebar}</SideBar>
        </div>
        <div
          className={clsx("w-full px-5 py-2 md:p-5", {
            "order-2": sidebarDirection === "left",
            "order-1": sidebarDirection === "right",
          })}
        >
          <AnimatePresence mode="wait">
            <motion.main
              key={useLocation().pathname}
              style={{ transformOrigin: "50% 50%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, type: "keyframes" }}
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
