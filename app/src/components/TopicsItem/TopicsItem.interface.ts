import { Post, Topics } from "@prisma/client";

export type TopicsItemProps = {
    topic: Topics & { posts: Pick<Post, 'id'>[] };
    index: number;
};