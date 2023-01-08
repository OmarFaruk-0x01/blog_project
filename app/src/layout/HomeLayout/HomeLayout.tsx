import Header from "@components/Header";
import type { FC } from "react";
import type { HomeLayoutProps } from "./HomeLayout.interface";

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />

      {children}
    </div>
  );
};

export default HomeLayout;
