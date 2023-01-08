import { Topics } from "@prisma/client";
import useSWR from "swr";

const useTopics = () => {
  const { data, mutate } = useSWR<Topics[]>("/api/topics");
  return { topics: data, mutate };
};

export default useTopics;
