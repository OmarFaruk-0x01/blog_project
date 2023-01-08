import { PostModel } from "@interfaces/models/post";
import { Post } from "@prisma/client";

export type PostCardProps = PostModel & {
  id: string;
};
