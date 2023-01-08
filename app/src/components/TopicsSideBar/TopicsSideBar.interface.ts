import { getTopics } from "@/models/topics.server";

export type TopicsSideBarProps = {
  topics: Awaited<ReturnType<typeof getTopics>>;
};
