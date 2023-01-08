import { Book, Images } from "@prisma/client";

export type BookCardProps = Partial<Book & { thumbnail: Images | null }>;
