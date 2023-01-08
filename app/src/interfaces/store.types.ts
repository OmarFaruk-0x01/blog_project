import { ReactNode } from "react";

export type OpenDialogType = {
  children: ReactNode;
}

export type UiStoreType = {
  overlay: boolean;
  navbarOpen: boolean;
  sidebarOpen: boolean;
  searchBarOpen: boolean;
  dialog: OpenDialogType | null;

  openDialog: (opt: OpenDialogType) => void
  closeDialog: () => void
  closeOverlay: () => void
  toggleNavbar: () => void;
  toggleSidebar: () => void;
  toggleSearchbar: () => void;
};
