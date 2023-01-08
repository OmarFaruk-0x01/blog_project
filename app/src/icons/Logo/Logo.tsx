import type { FC } from "react";
import type { LogoProps } from "./Logo.interface";

const Logo: FC<LogoProps> = () => {
  return (
    <div className="">
      <h5 className="relative text-3xl font-bold uppercase text-primary">
        Blog
      </h5>
    </div>
  );
};

export default Logo;
