import {
  type FC,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  forwardRef,
} from "react";
import type { AccordionProps } from "./Accordion.interface";
import clsx from "clsx";
import DownArrow from "@icons/DownArrow";

export type AccordionButtonProps = {
  toggleAccordion?: () => void;
  isOpen?: boolean;
  children: (
    ref: RefObject<HTMLButtonElement>,
    isOpen: boolean,
    toggle: () => void
  ) => JSX.Element;
  buttonRef?: RefObject<HTMLButtonElement>;
};

export type AccordionBodyProps = {
  toggleAccordion?: () => void;
  isOpen?: boolean;
  children: ReactNode | ((isOpen: boolean, toggle: () => void) => JSX.Element);
  bodyRef?: RefObject<HTMLDivElement>;
  className?: string;
};

const Accordion: FC<AccordionProps> = ({ children, show }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bodyHeight, setBodyHeight] = useState<number>(40);
  const [buttonHeight, setButtonHeight] = useState<number>(40);
  const bodyRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggleAccordion = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(show!);
  }, [show]);

  useEffect(() => {
    if (Boolean(bodyRef.current) && Boolean(buttonRef.current)) {
      setBodyHeight(bodyRef.current?.clientHeight!);
    }
  });
  useEffect(() => {
    if (Boolean(buttonRef.current)) {
      setButtonHeight(buttonRef.current?.clientHeight!);
    }
  });

  console.dir(bodyRef.current, isOpen);

  return (
    <div
      style={{
        height: isOpen ? Number(bodyHeight) + buttonHeight : buttonHeight,
      }}
      className={clsx("overflow-hidden  transition-all duration-300")}
    >
      {Children.map(children, (child) =>
        cloneElement(child, { isOpen, toggleAccordion, bodyRef, buttonRef })
      )}
    </div>
  );
};

export const AccordionButton = forwardRef<
  HTMLButtonElement,
  AccordionButtonProps
>(({ isOpen, toggleAccordion, children, buttonRef }, ref) => {
  return children(buttonRef!, isOpen!, toggleAccordion!);
});

export const AccordionBody = forwardRef<HTMLDivElement, AccordionBodyProps>(
  ({ isOpen, children, toggleAccordion, bodyRef, className }, ref) => {
    return (
      <div
        ref={bodyRef}
        className={clsx(
          className,
          "overflow-hidden transition-all duration-1000",
          {
            "h-100 opacity-100": isOpen!,
            "hide-accordionBody h-0 opacity-0": !isOpen!,
          }
        )}
      >
        {typeof children === "function"
          ? children?.(isOpen!, toggleAccordion!)
          : children}
      </div>
    );
  }
);

export default Accordion;
