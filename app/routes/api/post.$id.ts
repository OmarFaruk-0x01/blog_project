import { getPost } from "@/models/post.server";
import { requireUserId } from "@/session.server";
import { json, LoaderFunction } from "@remix-run/server-runtime";

export const loader: LoaderFunction = async ({ params, request }) => {
  const userId = await requireUserId(request);
  const id = params.id as string;
  const post = await getPost({ id });
  if (!post) return json({ message: "Not found" });
  return json(post);
};
