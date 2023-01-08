import { getPostsForSidebar } from "@/models/post.server";

export type PostsSideBarProps = {
  posts: Awaited<ReturnType<typeof getPostsForSidebar>>;
};
