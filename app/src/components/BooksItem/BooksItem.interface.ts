import type { Book, Images } from "@prisma/client";

export type BooksItemProps = {
  book: Book & { thumbnail: Images | null };
  index: number;
};
