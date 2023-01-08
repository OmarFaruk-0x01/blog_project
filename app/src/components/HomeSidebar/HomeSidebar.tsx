import { Link, useParams } from "@remix-run/react";
import ArrowRight from "@icons/ArrowRight";
import Button from "@ui/Button";
import type { FC } from "react";
import type { SearchBarProps } from "./HomeSidebar.interface";
import BooksSideBar from "@components/BooksSideBar";

const SearchBar: FC<SearchBarProps> = ({ topics, books }) => {
  const params = useParams();
  return (
    <div className="">
      
    </div>
  );
};

export default SearchBar;
