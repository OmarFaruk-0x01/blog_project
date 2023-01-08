import { getBooksForSidebar } from "@/models/books.server";

export type BooksSideBarProps = {
  books: Awaited<ReturnType<typeof getBooksForSidebar>>;
};
