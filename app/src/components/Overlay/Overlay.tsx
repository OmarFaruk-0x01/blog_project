import uiStore from "@store/uiStore";
import clsx from "clsx";
import type { FC } from "react";
import type { OverlayProps } from "./Overlay.interface";

const Overlay: FC<OverlayProps> = () => {
  const overlay = uiStore((state) => state.overlay);
  const closeOverlay = uiStore((state) => state.closeOverlay);
  return (
    <div
      onClick={closeOverlay}
      className={clsx(
        "fixed inset-0 z-overlay overflow-hidden bg-black/20 transition-all duration-500",
        { "visible opacity-100": overlay, "invisible opacity-0": !overlay }
      )}
    ></div>
  );
};

export default Overlay;
