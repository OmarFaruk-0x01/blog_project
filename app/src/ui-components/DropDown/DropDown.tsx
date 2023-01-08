import { type FC, type RefObject, useEffect } from "react";
import type { DropDownItemProps, DropDownProps } from "./DropDown.interface";
import { Children, cloneElement, useState } from "react";
import DownArrow from "@icons/DownArrow";
import Button from "@ui/Button";
import clsx from "clsx";
import { usePopper } from "react-popper";
import useOnClickOutside from "@hooks/useOnClickOutside";

const DropDown = ({ children, placeholder }: DropDownProps) => {
  const [refElement, setRefElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLUListElement | null>(
    null
  );
  const { styles, attributes } = usePopper(refElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 0],
        },
      },
      {
        name: "preventOverflow",
        options: {
          padding: { right: 20 },
          rootBoundary: "viewport",
        },
      },
    ],
  });
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const close = (ev: MouseEvent) => {
    console.log(ev);
    ev.stopImmediatePropagation();
    setOpen(false);
  };

  useOnClickOutside({ current: popperElement }, close);

  // useEffect(() => {
  //   if (window) {
  //     window.addEventListener("click", close);
  //     return () => {
  //       window.removeEventListener("click", close);
  //     };
  //   }
  // }, []);

  return (
    <div className="relative">
      <div className="">
        <Button
          ref={setRefElement}
          className="w-full"
          active={open}
          endIcon={
            <DownArrow
              className={clsx("transition-transform", {
                "rotate-180": open,
              })}
            />
          }
          onClick={(ev) => {
            ev.stopPropagation();
            toggle();
          }}
        >
          {placeholder}
        </Button>
      </div>
      <ul
        ref={setPopperElement}
        className={clsx(
          "absolute top-[100%] left-0 flex w-full min-w-fit flex-col rounded-md bg-white p-2 shadow-md transition-all",
          {
            ["invisible translate-y-2 opacity-0 duration-75"]: !open,
            ["visible translate-y-0 opacity-100"]: open,
          }
        )}
        style={styles.popper}
        {...attributes.popper}
      >
        {Children.map(children, (child) => cloneElement(child, {}))}
      </ul>
    </div>
  );
};

export const DropDownItem = ({ children, ...props }: DropDownItemProps) => {
  return (
    <button
      className={clsx(
        "my-1 cursor-pointer rounded-md p-2 hover:bg-gray-100 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-200"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

DropDown.Item = DropDownItem as FC<DropDownItemProps>;

export default DropDown;
