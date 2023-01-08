import type { User, Topics, Images } from "@prisma/client";

import { prisma } from "@/db.server";

export function getTopic({ id }: Pick<Topics, "id">) {
  return prisma.topics.findFirst({
    select: {
      id: true,
      label: true,
    },
    where: { id },
  });
}

export function getTopics() {
  return prisma.topics.findMany({
    where: {
      posts: { some: { status: "Published" } },
    },
    select: {
      id: true,
      label: true,
      posts: { select: { id: true }, where: { status: "Published" } },
    },
    orderBy: { label: "desc" },
  });
}

export async function getTopicsListItems({
  page = 1,
  size = 10,
}: {
  page?: number;
  size?: number;
}) {
  const topics = await prisma.topics.findMany({
    select: {
      id: true,
      label: true,
    },
    orderBy: { label: "desc" },
    take: size,
    skip: (page - 1) * size,
  });
  const totalTopics = await prisma.topics.count({});
  const pages = Math.ceil(totalTopics / size);

  return {
    topics,
    currentPage: page,
    totalPages: pages,
    size,
    totalTopics,
  };
}

export function getTopicsPrivate() {
  return prisma.topics.findMany({
    select: {
      id: true,
      label: true,
      slug: true,
      posts: { select: { id: true } },
    },
    orderBy: { label: "desc" },
  });
}

export function createTopics({ label, slug }: Pick<Topics, "label" | "slug">) {
  return prisma.topics.create({
    data: {
      label,
      slug,
    },
  });
}
export function updateTopics({ label, slug, id }: Topics) {
  return prisma.topics.update({
    where: { id },
    data: {
      label,
      slug,
    },
  });
}

export function deleteTopics({ id }: Pick<Topics, "id">) {
  return prisma.topics.deleteMany({
    where: { id },
  });
}
