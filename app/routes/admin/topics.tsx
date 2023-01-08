import type { Topics } from "@prisma/client";
import {
  createTopics,
  deleteTopics,
  getTopics,
  getTopicsPrivate,
  updateTopics,
} from "@/models/topics.server";
import {
  getSession,
  requireUserId,
  sessionStorage,
  setToast,
} from "@/session.server";
import Add from "@icons/Add";
import Delete from "@icons/Delete";
import Edit from "@icons/Edit";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { json, LoaderArgs, ActionArgs } from "@remix-run/server-runtime";
import Button from "@ui/Button";
import TextInput from "@ui/TextInput";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ChangeEvent, useEffect, useState } from "react";
import { slugify } from "@helpers/utils";
import TopicsItem from "@components/TopicsItem";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  try {
    const topics = await getTopicsPrivate();
    return json({
      topics,
    });
  } catch (err) {
    return json(null);
  }
};

type ActionDataType = {
  status: "success" | "failed";
  error: {
    field: string;
    message: string;
  } | null;
};

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const session = await getSession(request);
  const formData = await request.formData();
  const resp: ActionDataType = {
    status: "success",
    error: null,
  };
  const topicData: Pick<Topics, "label" | "slug"> = {
    label: formData.get("label") as string,
    slug: formData.get("slug") as string,
  };

  const topicId = formData.get("topicId") as string;

  if (!!!topicData.label && request.method.toLowerCase() !== "delete") {
    setToast({ session, message: "Topic label is required", type: "error" });
    return json(null, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  if (!!!topicData.slug && request.method.toLowerCase() !== "delete") {
    setToast({ session, message: "Topic slug is required", type: "error" });
    return json(null, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  if (!!!topicId && request.method.toLowerCase() === "delete") {
    setToast({ session, message: "Topic id is required", type: "error" });
    return json(null, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  try {
    switch (request.method.toLowerCase()) {
      case "delete": {
        const deletedTopic = await deleteTopics({ id: topicId });
        setToast({
          session,
          message: `"${topicData.label}" is deleted successfully.`,
          type: "success",
        });
        return json(resp, {
          headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
          },
        });
      }
      case "post": {
        const newTopic = await createTopics(topicData);
        console.log(newTopic);
        setToast({
          session,
          message: `"${topicData.label}" added successfully.`,
          type: "success",
        });
        return json(resp, {
          headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
          },
        });
      }
      case "patch": {
        if (!topicId) {
          resp.status = "failed";
          setToast({
            session,
            message: `Topic Id not found.`,
            type: "error",
          });
          return json(resp, {
            headers: {
              "Set-Cookie": await sessionStorage.commitSession(session),
            },
          });
        }
        const topic = await updateTopics({ ...topicData, id: topicId });
        setToast({
          session,
          message: `"${topic.label}" update successfully.`,
          type: "success",
        });
        return json(resp, {
          headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
          },
        });
      }
      default: {
        return json(null);
      }
    }
  } catch (err) {
    resp.status = "failed";
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        console.log(err.meta);
        if ((err?.meta?.target as string[])?.includes?.("slug")) {
          resp.error = {
            field: "slug",
            message: `${topicData.label} is already exists`,
          };
          setToast({
            session,
            message: `"${topicData.label}" slug is already exists`,
            type: "error",
          });
          return json(null, {
            headers: {
              "Set-Cookie": await sessionStorage.commitSession(session),
            },
          });
        } else if ((err?.meta?.target as string[])?.includes?.("label")) {
          resp.error = {
            field: "slug",
            message: `"${topicData.label}" slug is already exists`,
          };
          setToast({
            session,
            message: `${topicData.label} topic is already exists`,
            type: "error",
          });
          return json(null, {
            headers: {
              "Set-Cookie": await sessionStorage.commitSession(session),
            },
          });
        }
      }
    }
    return json(resp);
  }
};

const Topics = () => {
  const actionData = useActionData<typeof action>();
  const [topic, setTopic] = useState<Pick<Topics, "label" | "slug">>({
    label: "",
    slug: "",
  });
  const data = useLoaderData<typeof loader>();
  const topics = data?.topics || [];

  const handleChange =
    (field: "label" | "slug") => (ev: ChangeEvent<HTMLInputElement>) => {
      if (field === "label") {
        setTopic({ label: ev.target.value, slug: slugify(ev.target.value) });
      } else {
        setTopic((prev) => ({ ...prev, slug: slugify(ev.target.value) }));
      }
    };

  useEffect(() => {
    if (actionData?.status === "success") {
      setTopic({ label: "", slug: "" });
    }
  }, [actionData]);

  return (
    <div className="grid grid-cols-1 gap-4 font-siliguri lg:grid-cols-[1fr_2fr]">
      <Form
        method="post"
        className="flex flex-col items-start justify-start gap-2"
      >
        <h4 className="text-xl font-bold">Add Topic</h4>

        <TextInput
          placeholder="দ্বীনদারিতা"
          label="বিষয়"
          name="label"
          onChange={handleChange("label")}
          value={topic.label}
        />
        <TextInput
          placeholder="dindarita"
          label="slug"
          name="slug"
          onChange={handleChange("slug")}
          value={topic.slug}
        />
        <Button startIcon={<Add />} type="submit">
          Add
        </Button>
      </Form>
      <div className="lg:px-4">
        <h4 className="text-xl font-bold">List Topics</h4>
        <div className="mt-2">
          <div className="grid grid-cols-[auto_1fr_auto_auto] font-semibold text-gray-400">
            <div className="h-[50px] w-[50px] items-center justify-center p-2">
              SL.
            </div>
            <div className="p-2">Topic</div>
            <div className="h-[50px] w-[100px] p-2">Posts</div>
            <div className="h-[50px] w-[120px] p-2"></div>
          </div>
          <hr />
          {topics.map((topic, index) => (
            <TopicsItem key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Topics;
