import { createTopics, getTopicsPrivate } from "@/models/topics.server";
import { requireUserId } from "@/session.server";
import {
  ActionFunction,
  json,
  LoaderFunction,
} from "@remix-run/server-runtime";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const topics = await getTopicsPrivate();
  console.log("API: ", topics);

  return json(topics);
};

export const action: ActionFunction = async ({ request, context, params }) => {
  if (request.method.toLowerCase() === "post") {
    const formData = await request.formData();
    const topic_label = formData.get("label") as string;
    const topic_slug = formData.get("slug") as string;

    if (!topic_label) {
      return new Response("Not Found", { status: 404 });
    }
    const topic = await createTopics({
      label: topic_label,
      slug: topic_slug,
    });
    console.log(topic);

    return json(await getTopicsPrivate());
  }

  return null;
};
