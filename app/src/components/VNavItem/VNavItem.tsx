import type { FC } from "react";
import type { VNavItemProps } from "./VNavItem.interface";
import { useMemo } from "react";
import DownArrow from "@icons/DownArrow";
import Accordion from "@ui/Accordion";
import { AccordionBody, AccordionButton } from "@ui/Accordion/Accordion";
import Button from "@ui/Button";
import clsx from "clsx";
import { Link, useLocation } from "@remix-run/react";

const VNavItem: FC<VNavItemProps> = ({ title, children, url }) => {
  const location = useLocation();
  const locations = useMemo(() => children?.flatMap((ch) => ch.url) || [], [location]);
  const pathname = useMemo(() => location?.pathname?.match(/\/[^/]+/g)?.join(''),[location])
  const isActive = useMemo(() => locations.includes(pathname), [location]);
  
  if (children?.length! > 0) {
    return (
      <Accordion show={isActive}>
        <AccordionButton>
          {(ref, isOpen, toggle) => (
            <Button
              ref={ref}
              onClick={toggle}
              active={isOpen}
              className="flex w-full items-center justify-between"
              endIcon={
                <span
                  className={clsx("transition-transform duration-300", {
                    "rotate-180": isOpen,
                  })}
                >
                  <DownArrow />
                </span>
              }
            >
              {title}
            </Button>
          )}
        </AccordionButton>
        <AccordionBody className="py-2 px-3">
          <div className="flex flex-col gap-2">
            {children?.map((child) => (
              <VNavItem {...child} />
            ))}
          </div>
        </AccordionBody>
      </Accordion>
    );
  }
  return (
    <Link to={url!}>
      <Button className="w-full text-start" active={url === pathname}>
        {title}
      </Button>
    </Link>
  );
};

export default VNavItem;
