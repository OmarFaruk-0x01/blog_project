import { getBooks, getBooksForSidebar } from "@/models/books.server";
import { getTopics } from "@/models/topics.server";
import type { Prisma, Topics } from "@prisma/client";

export type SearchBarProps = {
  topics: Awaited<ReturnType<typeof getTopics>>;
  books: Awaited<ReturnType<typeof getBooksForSidebar>>;
};
