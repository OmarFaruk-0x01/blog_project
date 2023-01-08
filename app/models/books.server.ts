import type { User, Book, Images, Prisma } from "@prisma/client";

import { prisma } from "@/db.server";

export function getBook({ slug }: Pick<Book, "slug">) {
  return prisma.book.findFirst({
    where: { slug },
    include: { thumbnail: true },
  });
}

export function getBooksForSidebar() {
  return prisma.book.findMany({
    take: 9,
    select: { thumbnail: true, id: true, slug: true },
    where: { thumbnail: { NOT: { src: "" } } },
  });
}

export async function getBooksListItems({
  page = 1,
  size = 10,
}: {
  page?: number;
  size?: number;
}) {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      author: true,
      description: true,
      publication: true,
      thumbnail: true,
      createdAt: true,
    },
    orderBy: { updatedAt: "desc" },
    take: size,
    skip: (page - 1) * size,
  });
  const totalBooks = await prisma.book.count({});
  const pages = Math.ceil(totalBooks / size);

  return {
    books,
    currentPage: page,
    totalPages: pages,
    size,
    totalBooks,
  };
}

export function getBooks(options?: Prisma.BookFindManyArgs) {
  return prisma.book.findMany(options);
}

export function getBooksPrivate() {
  return prisma.book.findMany({
    include: { thumbnail: true },
  });
}

export function createBooks({
  thumbnail,
  ...data
}: Omit<Book, "id" | "createdAt" | "updatedAt"> & { thumbnail: Images }) {
  return prisma.book.create({
    data: {
      ...data,
      thumbnail: {
        create: { src: thumbnail.src, publicId: thumbnail.publicId },
      },
    },
  });
}
export function updateBooks(
  {
    thumbnail,
    ...data
  }: Omit<Book, "id" | "createdAt" | "updatedAt"> & { thumbnail: Images },
  id: string
) {
  return prisma.book.update({
    where: { id },
    data: {
      ...data,
      thumbnail: {
        update: { src: thumbnail.src, publicId: thumbnail.publicId },
      },
    },
  });
}

export function deleteBooks({ id }: Pick<Book, "id">) {
  return prisma.book.deleteMany({
    where: { id },
  });
}
