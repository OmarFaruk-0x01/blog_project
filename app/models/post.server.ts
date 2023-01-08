import type { User, Post, Images, Topics, Status } from "@prisma/client";

import { prisma } from "@/db.server";

export type { Post, Images } from "@prisma/client";

export function getPost({ id }: Pick<Post, "id">) {
  return prisma.post.findFirst({
    select: {
      id: true,
      body: true,
      slug: true,
      short_body: true,
      status: true,
      title: true,
      createdAt: true,
      topics: true,
      featured_image: true,
    },
    where: { id },
  });
}

export async function getPostsForSidebar() {
  return prisma.post.findMany({
    select: {
      title: true,
      featured_image: true,
      slug: true,
      topics: true,
      short_body: true,
    },
    where: { status: "Published" },
    take: 6,
  });
}
export function getPostBySlug({ slug }: Pick<Post, "slug">) {
  return prisma.post.findFirst({
    select: {
      id: true,
      body: true,
      slug: true,
      short_body: true,
      title: true,
      createdAt: true,
      topics: true,
      featured_image: true,
    },
    where: { slug },
  });
}

export function getPostsByTopicSlug({ slug }: Pick<Post, "slug">) {
  return prisma.post.findMany({
    select: {
      id: true,
      body: true,
      slug: true,
      short_body: true,
      title: true,
      createdAt: true,
      topics: true,
      featured_image: true,
    },
    where: { slug },
  });
}

export async function getPostListItems({
  status,
  topic,
  page = 1,
  size = 10,
}: {
  status?: Status;
  topic?: string;
  page?: number;
  size?: number;
}) {
  const query = {
    status,
    topics: !!topic
      ? topic === "un_categorized"
        ? { every: { id: topic } }
        : { some: { id: topic } }
      : undefined,
  };

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      featured_image: true,
      topics: true,
      slug: true,
      short_body: true,
      status: true,
    },
    where: query,
    orderBy: { updatedAt: "desc" },
    take: size,
    skip: (page - 1) * size,
  });
  const totalPosts = await prisma.post.count({ where: query });
  const pages = Math.ceil(totalPosts / size);

  return {
    posts,
    currentPage: page,
    totalPages: pages,
    size,
    totalPosts,
  };
}

export function createPost({
  body,
  title,
  userId,
  featured_image,
  short_body,
  slug,
  status,
  topics,
}: Pick<Post, "body" | "title" | "short_body" | "slug" | "status"> & {
  userId: User["id"];
  featured_image?: Partial<Images>;
  topics: Topics[];
}) {
  return prisma.post.create({
    data: {
      title,
      body,
      short_body,
      slug,
      status,
      featured_image: featured_image
        ? {
            create: {
              src: featured_image.src!,
              publicId: featured_image.publicId,
            },
          }
        : undefined,
      user: {
        connect: {
          id: userId,
        },
      },
      topics: {
        connect: [...topics.map((t) => ({ id: t.id }))],
      },
    },
  });
}

export function updatePost({
  id,
  body,
  title,
  userId,
  featured_image,
  short_body,
  slug,
  status,
  topics,
}: Pick<Post, "id" | "body" | "title" | "short_body" | "slug" | "status"> & {
  userId: User["id"];
  featured_image?: Images["id"];
  topics: Topics[];
}) {
  return prisma.post.update({
    where: { id },
    data: {
      title,
      body,
      short_body,
      slug,
      status,
      featured_image: featured_image
        ? {
            update: { src: featured_image },
          }
        : undefined,
      user: {
        connect: {
          id: userId,
        },
      },
      topics: {
        set: [...topics.map((t) => ({ id: t.id }))],
      },
    },
  });
}

export function deletePost({
  id,
  userId,
}: Pick<Post, "id"> & { userId: User["id"] }) {
  return prisma.post.deleteMany({
    where: { id, userId },
  });
}
