import { PostModel } from "@interfaces/models/post";
import useSWR from "swr";

const usePost = ({ id }: { id: string }) => {
  const { data, mutate } = useSWR<PostModel>(!!id ? "/api/post/" + id : null);
  return { post: data, mutate };
};

export default usePost;
