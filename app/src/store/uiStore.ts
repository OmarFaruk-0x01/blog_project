import { UiStoreType } from "@interfaces/store.types";
import create from "zustand";
import { devtools } from "zustand/middleware";

const uiStore = create<UiStoreType, [["zustand/devtools", never]]>(
  devtools((set, get) => ({
    navbarOpen: false,
    sidebarOpen: false,
    searchBarOpen: false,
    overlay: false,
    dialog: null,
    openDialog(opt) {
      set({ dialog: opt, overlay: true })
    },
    closeDialog() {
      set({ dialog: null, overlay: false })
    },
    closeOverlay() {
      set({ dialog: null, navbarOpen: false, searchBarOpen: false, overlay: false })
    },
    toggleNavbar() {
      set({ navbarOpen: !get().navbarOpen, overlay: !get().navbarOpen });
    },
    toggleSidebar() {
      set({
        sidebarOpen: !get().sidebarOpen,
        overlay: !get().sidebarOpen
      });
    },
    toggleSearchbar() {
      set({
        searchBarOpen: !get().searchBarOpen,
      });
    },
  }))
);

export const selectNavOpen = (state: UiStoreType) => state.navbarOpen;
export const selectSidebarOpen = (state: UiStoreType) => state.sidebarOpen;
export const selectSearchbarOpen = (state: UiStoreType) => state.searchBarOpen;

export const selectToggleNavbar = (state: UiStoreType) => state.toggleNavbar;
export const selectToggleSidebar = (state: UiStoreType) => state.toggleSidebar;
export const selectToggleSearchbar = (state: UiStoreType) =>
  state.toggleSearchbar;

export default uiStore;
