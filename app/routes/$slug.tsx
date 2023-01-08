import { getPost, getPostBySlug } from "@/models/post.server";
import RootLayout from "@layout/RootLayout";
import {
  useLoaderData,
  Link,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import {
  json,
  LoaderArgs,
  LoaderFunction,
  redirect,
} from "@remix-run/server-runtime";
import { marked } from "marked";
import Button from "@ui/Button";
import insane from "insane";
import ArrowLeft from "@icons/ArrowLeft";
import HomeSidebar from "@components/HomeSidebar";
import { getTopics } from "@/models/topics.server";
import shuffle from "lodash.shuffle";
import { getBooksForSidebar } from "@/models/books.server";
import TopicsSideBar from "@components/TopicsSideBar";
import BooksSideBar from "@components/BooksSideBar";
import { useMemo } from "react";
export const loader = async (ctx: LoaderArgs) => {
  const slug = ctx.params.slug as string;
  const post = await getPostBySlug({ slug });
  const topics = await getTopics();
  const books = await getBooksForSidebar();
  if (!post) return redirect("/");
  post.body = insane(marked(post.body));
  return json({ post, topics: shuffle(topics), books });
};

const Blog_Details = () => {
  const location = useLocation();
  const nav = useNavigate();
  const { post, topics, books } = useLoaderData<typeof loader>();
  const bars = useMemo(
    () =>
      shuffle([
        <TopicsSideBar topics={topics} />,
        <BooksSideBar books={books} />,
      ]),
    []
  );
  return (
    <RootLayout>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
        <div className="relative font-siliguri">
          <div className="relative top-0 mb-3 lg:absolute">
            <Button
              startIcon={<ArrowLeft />}
              texture="ghost"
              onClick={() => nav(-1)}
            >
              Go Back
            </Button>
          </div>
          <h5 className="mt-10 text-center font-siliguri text-3xl font-bold text-gray-600">
            {post?.title}
          </h5>
          <div className="flex items-center justify-center gap-2 py-5 text-sm font-medium">
            <span className="text-gray-400">29 Nov 2018</span>
          </div>
          <div className="mt-5">
            <div className="image-container relative z-0 float-right m-5 rounded-lg shadow-md hover:shadow-lg md:h-[320px]">
              <img
                alt={post?.title || ""}
                className="aspect-video h-full !w-full rounded-lg bg-slate-50 !object-cover"
                src={post?.featured_image?.src || "/noimage.jpg"}
              />
            </div>
            <div
              className=" text-justify font-siliguri text-xl text-gray-500 "
              dangerouslySetInnerHTML={{
                __html: post?.body || "",
              }}
            ></div>
            {/* <p className="font-siliguri text-xl text-gray-500">{post?.body}</p> */}
          </div>
        </div>
        <div className="w-full p-2 font-siliguri md:w-[350px]">{bars}</div>
      </div>
    </RootLayout>
  );
};

export default Blog_Details;
