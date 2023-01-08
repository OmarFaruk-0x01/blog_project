export type GridListPagination = {};

export type GridListProps<T> = {
  items: T[];
  renderItems: (item: T) => JSX.Element;
  currentPage: number;
  totalPages: number;
  itemPerPage: number;
  totalItem: number;
  onNextMove: (nextPage: number) => void;
  onPrevMove: (prevPage: number) => void;
  onPageClick: (pageNumber: number) => void;
  itemPerRow?: "1" | "2" | "3" | "4";
};
