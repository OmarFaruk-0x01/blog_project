import { Images, Post, Topics } from "@prisma/client";

export type PostModel = Pick<
  Post,
  "title" | "body" | "slug" | "status" | "short_body" | "id"
> & {
  featured_image: Images | null | string;
  topics: Topics[];
};
