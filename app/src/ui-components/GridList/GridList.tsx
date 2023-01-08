import { getPageNumbers } from "@helpers/utils";
import ArrowLeft from "@icons/ArrowLeft";
import ArrowRight from "@icons/ArrowRight";
import { useSearchParams } from "@remix-run/react";
import Button from "@ui/Button";
import { FC, useMemo } from "react";
import type { GridListProps } from "./GridList.interface";
import clsx from "clsx";

function GridList<T>({
  items,
  currentPage,
  onNextMove,
  onPrevMove,
  onPageClick,
  renderItems,
  totalPages,
  itemPerPage,
  totalItem,
  itemPerRow = "2",
}: GridListProps<T>) {
  const pageNumbers = useMemo(
    () =>
      getPageNumbers({
        currentPage,
        pageSize: itemPerPage,
        total: totalItem,
        pageNumbersToShow: 4,
      }),
    [currentPage, itemPerPage, totalItem]
  );

  return (
    <div className="mt-5">
      <div
        className={clsx("grid grid-cols-1 gap-5", {
          "md:grid-cols-1": itemPerRow === "1",
          "md:grid-cols-1 lg:grid-cols-2": itemPerRow === "2",
          "md:grid-cols-3": itemPerRow === "3",
          "md:grid-cols-4": itemPerRow === "4",
        })}
      >
        {items.map(renderItems)}
      </div>
      {pageNumbers.length > 0 && (
        <div className="mt-5 flex items-center justify-center gap-3 text-gray-500">
          <Button
            variant="normal"
            texture="ghost"
            disabled={currentPage === 1}
            onClick={() => onPrevMove(currentPage - 1)}
          >
            <ArrowLeft />
          </Button>
          {pageNumbers.map((page, index) => (
            <Button
              key={index}
              variant="primary"
              texture={page == currentPage ? "solid" : "ghost"}
              active={page == currentPage}
              className="!px-5"
              // disabled={page == currentPage}
              onClick={() => {
                if (typeof page === "number") {
                  onPageClick(+page);
                }
              }}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="normal"
            texture="ghost"
            disabled={currentPage === totalPages}
            onClick={() => {
              onNextMove(currentPage + 1);
            }}
          >
            <ArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
}

export default GridList;
