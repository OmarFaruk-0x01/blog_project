import { ReactNode } from "react";

export type RootLayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  sidebarDirection?: "left" | "right";
  noHeader?: boolean
};
