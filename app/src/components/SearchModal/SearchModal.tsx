import Backdrop from "@components/Backdrop";
import Search from "@icons/Search";
import uiStore, {
  selectSearchbarOpen,
  selectToggleSearchbar,
} from "@store/uiStore";
import AutoComplete from "@ui/AutoComplete";
import clsx from "clsx";
import type { FC } from "react";
import type { SearchModalProps } from "./SearchModal.interface";

const SearchModal: FC<SearchModalProps> = () => {
  const searchBarOpen = uiStore(selectSearchbarOpen);
  const toggleSearchbar = uiStore(selectToggleSearchbar);
  const options = [
    { id: 1, label: "Omar" },
    { id: 2, label: "Sadik" },
  ];

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 flex items-start justify-center  p-10 transition-opacity duration-300 sm:p-32 ",
          {
            ["visible z-50 opacity-100"]: searchBarOpen,
            ["invisible -z-40 opacity-0"]: !searchBarOpen,
          }
        )}
      >
        <Backdrop
          active={searchBarOpen}
          onClick={toggleSearchbar}
          className={{ ["bg-black/0"]: !searchBarOpen }}
        />
        <AutoComplete
          options={options}
          className={clsx("z-50 transition-transform duration-500", {
            ["scale-100"]: searchBarOpen,
            ["scale-0 opacity-0"]: !searchBarOpen,
          })}
          getOptionLabel={(item) => item.label}
          getFilterLabel={(item, searchText) => item.label.includes(searchText)}
          onItemSelect={(item, index) => {
            toggleSearchbar();
            console.log("Autocomplete Onselect: ", item);
          }}
          textInputProps={{ startIcon: <Search /> }}
          textInputClass="text-2xl"
        />
      </div>
    </>
  );
};

export default SearchModal;
