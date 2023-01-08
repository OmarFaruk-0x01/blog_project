import clsx from "clsx";
import type { FC } from "react";
import type { BackdropProps } from "./Backdrop.interface";

const Backdrop: FC<BackdropProps> = ({ onClick, className, active }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "fixed inset-0 z-10 bg-black opacity-30 transition-opacity duration-300",
        {
          ["z-0 opacity-30"]: active,
          ["-z-50 opacity-0"]: !active,
        },
        className
      )}
    ></div>
  );
};

export default Backdrop;
