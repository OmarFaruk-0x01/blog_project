import { ClientOnly } from "@components/ClientOnly/ClientOnly";
import PostMetaBar from "@components/PostMetaBar";
import ArrowLeft from "@icons/ArrowLeft";
import RootLayout from "@layout/RootLayout";
import { Link, useFetcher, useLocation } from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/server-runtime";
import { withZod } from "@remix-validated-form/with-zod";
import { lazy, Suspense, useEffect, useRef } from "react";
import { z } from "zod";
import Button from "@ui/Button";
import TextInput from "@ui/TextInput";
import { useFormik, FormikProvider, FormikValues, FormikHelpers } from "formik";
import { PostModel } from "@interfaces/models/post";
import { marked } from "marked";
import { createPost, getPost, Images, updatePost } from "@/models/post.server";
const Editor = lazy(() => import("@components/Editor"));
import insane from "insane";
import {
  getSession,
  requireUserId,
  sessionStorage,
  setToast,
} from "@/session.server";
import { useDebouncedCallback } from "use-debounce";
import usePost from "@hooks/api/usePost";
import Badge from "@ui/Badge";
import Skeleton from "@components/Skeleton";
import LoadingScreen from "@components/LoadingScreen";
import { slugify } from "@helpers/utils";
import pick from "lodash.pick";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";

export const validator = withZod(
  z.object<{ [_ in keyof PostModel]: z.ZodTypeAny }>({
    id: z.string(),
    title: z.string(),
    body: z.string(),
    slug: z.string(),
    status: z.string(),
    short_body: z.string(),
    topics: z.string(),
    featured_image: z.any(),
  })
);

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const postId = url.searchParams.get("id");
  if (!!postId) {
    const post = await getPost({ id: postId });
    if (!!post) {
      return json(post);
    }
  }

  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = await requireUserId(request);
  const postData = await request.formData();
  const newPost = {
    id: postData.get("id") as string,
    body: postData.get("body") as string,
    short_body: postData.get("short_body") as string,
    slug:
      (postData.get("slug") as string) ||
      slugify(postData.get("title") as string),
    status:
      (postData
        .get("status")
        ?.toString()
        .replace("Unpublished", "Draft") as PostModel["status"]) || undefined,
    title: postData.get("title") as string,
    topics:
      (JSON.parse(postData.get("topics") as string) as PostModel["topics"]) ||
      [],
    userId: userId as string,
  };
  try {
    if (request.method.toLowerCase() === "post") {
      const data = await validator.validate(postData);

      if (data.error) {
        console.log(data.error);
        return null;
      }

      const {
        title,
        body,
        short_body,
        slug,
        status,
        topics: _topics,
        featured_image: _featured_image,
      } = data.data as PostModel;

      // @ts-ignore
      const topics = JSON.parse(_topics) as PostModel["topics"];
      // @ts-ignore
      const featured_image = JSON.parse(_featured_image as string) as Images;

      console.log("POST: ID: ", postData.get("id"));
      const post = await createPost({
        title: title || "",
        body: body,
        short_body,
        slug: !!slug ? slug : slugify(title),
        status,
        topics,
        userId,
        featured_image,
      });

      setToast({ session, message: `Post is ${post.status}`, type: "success" });
      return redirect(`/admin/posts`, {
        headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
      });
    } else if (request.method.toLowerCase() === "patch") {
      let status = postData.get("status");
      const updatedPost = await updatePost(newPost);
      if (status === "Unpublished") {
        setToast({ session, message: `Post is unpublished`, type: "success" });
        return json(
          {},
          {
            headers: {
              "Set-Cookie": await sessionStorage.commitSession(session),
            },
          }
        );
      }
      setToast({
        session,
        message: `Post is ${updatedPost.status}.`,
        type: "success",
      });
      return redirect(`/admin/posts`, {
        headers: {
          "Set-Cookie": await sessionStorage.commitSession(session),
        },
      });
    }
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        setToast({
          session,
          message: `"${postData.get("slug")}" slug is already exist in DB`,
          type: "error",
        });
      }
    }
    console.log(JSON.stringify(err));
    return json(newPost, {
      headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
  }
};

const NewPost = () => {
  const editorRef = useRef<null>(null);
  const location = useLocation();
  const fetcher = useFetcher();
  const { post, mutate } = usePost({
    id: location.hash.replace("#", "") as string,
  });

  const formik = useFormik<PostModel>({
    initialValues: {
      id: "",
      body: "",
      title: "",
      slug: "",
      status: "Draft",
      topics: [],
      short_body: "",
      featured_image: null,
    },
    onSubmit,
  });

  function onSubmit(
    values: PostModel,
    formikHelpers: FormikHelpers<PostModel>
  ) {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "string") {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });
    if (!!values.id) {
      fetcher.submit(formData, { method: "patch" });
      return;
    } else {
      fetcher.submit(formData, { method: "post" });
    }
    formikHelpers.setSubmitting(false);
  }

  // For Syncing with the database after any changes in the editor.
  const patchPost = useDebouncedCallback(() => {
    const formData = new FormData();
    Object.entries(formik.values).forEach(([key, value]) => {
      if (typeof value === "string") {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });
    if (formik.values.id) {
      fetcher.submit(formData, { method: "patch" });
      return;
    } else {
      fetcher.submit(formData, { method: "post" });
    }
  }, 5000);

  const handleMarkdown = (markdown: string, raw: string) => {
    console.log(markdown);

    if (!!post && (post?.body.length as number) > 0 && markdown.length === 0)
      return;
    formik.setFieldValue("body", markdown);
    formik.setFieldValue("short_body", raw.split(" ").slice(0, 50).join(" "));
    // if (post?.body !== markdown) {
    //   patchPost();
    // }
  };

  useEffect(() => {
    // if (fetcher.type === "done" && fetcher.state === "idle") {
    //   console.log("Before Mutate: ", fetcher.data);
    //   // mutate?.(fetcher.data);

    // }
    switch (fetcher.state) {
      case "idle":
        if (formik.isSubmitting) {
          formik.setSubmitting(false);
        }
        return;
      case "loading":
        return;
      case "submitting": {
        formik.setSubmitting(true);
      }
    }
  }, [fetcher.state, fetcher.type]);

  useEffect(() => {
    if (!!post) {
      // if (editorRef.current?.manager.mounted) {
      //   editorRef.current?.setContent(post.body, { triggerChange: true });
      // }
      console.log(post);
      formik.setValues({
        ...formik.values,
        ...pick(post, [
          "id",
          "body",
          "title",
          "slug",
          "short_body",
          "status",
          "topics",
          "featured_image",
        ]),
      });
    }
  }, [post]);

  return (
    <FormikProvider value={formik}>
      <ClientOnly fallback={<LoadingScreen />}>
        <RootLayout sidebarDirection="right" sidebar={<PostMetaBar />} noHeader>
          <Suspense fallback={<Skeleton />}>
            <div>
              <div className="flex items-center justify-between gap-2">
                <Link to="/admin/posts">
                  <Button
                    startIcon={<ArrowLeft />}
                    texture="ghost"
                    className="text-sm"
                  >
                    Back to posts
                  </Button>
                </Link>
                {!!formik.values.id && (
                  <Badge
                    variant={
                      formik.values.status === "Draft"
                        ? "info"
                        : formik.isSubmitting
                        ? "secondary"
                        : "success"
                    }
                    label={
                      formik.values.status === "Published"
                        ? "Published"
                        : formik.isSubmitting
                        ? "Saving..."
                        : "Draft"
                    }
                  />
                )}
              </div>
              <div className="my-3">
                <TextInput
                  name="title"
                  placeholder="Title"
                  value={formik.values.title}
                  className="font-siliguri text-3xl font-semibold placeholder:text-gray-200"
                  containerClass="border-0"
                  onChange={(ev) => {
                    formik.setFieldValue("slug", slugify(ev.target.value));
                    formik.setFieldValue("title", ev.target.value);
                  }}
                />
              </div>
              <div className="">
                <Editor value={formik.values.body} onChange={handleMarkdown} />
              </div>
            </div>
          </Suspense>
        </RootLayout>
      </ClientOnly>
    </FormikProvider>
  );
};

export default NewPost;
