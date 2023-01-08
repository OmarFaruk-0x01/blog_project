import { getBook } from "@/models/books.server";
import { getPostsForSidebar } from "@/models/post.server";
import { getTopics } from "@/models/topics.server";
import PostsSideBar from "@components/PostsSideBar";
import TopicsSideBar from "@components/TopicsSideBar";
import ArrowLeft from "@icons/ArrowLeft";
import RootLayout from "@layout/RootLayout";
import { Response } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import Button from "@ui/Button";

export const loader = async ({ params }: LoaderArgs) => {
  const book = await getBook({ slug: params.slug as string });
  const topics = await getTopics();
  const posts = await getPostsForSidebar();
  if (!book) {
    throw new Response("404", { status: 404 });
  }
  return json({ book, topics, posts });
};

const BookPage = () => {
  const nav = useNavigate();
  const { book, topics, posts } = useLoaderData<typeof loader>();
  return (
    <RootLayout>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
        <div className="relative font-siliguri">
          <div className="relative ">
            <Button
              startIcon={<ArrowLeft />}
              texture="ghost"
              onClick={() => nav(-1)}
            >
              Go Back
            </Button>
          </div>
          <div className=" grid grid-cols-[auto_1fr]">
            <div className="image-container relative z-0  m-5 w-[150px] rounded-lg shadow-md hover:shadow-lg md:h-[220px]">
              <img
                alt={book?.title || ""}
                className="h-full !w-full rounded-lg bg-slate-50 !object-cover"
                src={book?.thumbnail?.src || "/noimage.jpg"}
              />
            </div>
            <div>
              <h5 className="mt-5 text-start font-siliguri text-3xl font-bold text-gray-600">
                {book.title}
              </h5>
              <div className="flex items-center justify-start gap-1 py-1  text-sm font-medium">
                <span className="text-base font-medium text-gray-600">
                  {book.author}
                </span>
                <sub className="text-xs text-primary-300">/লেখক</sub>
              </div>
              <div className="flex items-center justify-start gap-1 py-1  text-sm font-medium">
                <span className="text-base font-medium text-gray-600">
                  {book.publication}
                </span>
                <sub className="text-xs text-primary-300">/প্রকাশনী</sub>
              </div>
              <div className="flex items-center justify-start gap-1 py-1  text-sm font-medium">
                <span className="text-sm font-medium text-gray-500">
                  পৃষ্ঠাঃ
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {book.pages}
                </span>
              </div>
              <div className="flex items-center justify-start gap-1 py-1  text-base font-normal">
                <p>{book.description}</p>
              </div>
            </div>
            {/* <div
              className=" text-justify font-siliguri text-xl text-gray-500 "
              dangerouslySetInnerHTML={{
                __html: book?.body || "",
              }}
            ></div> */}
            {/* <p className="font-siliguri text-xl text-gray-500">{book?.body}</p> */}
          </div>
        </div>
        <div className="w-full p-2 font-siliguri md:w-[350px]">
          <PostsSideBar posts={posts} />
          <TopicsSideBar topics={topics} />
        </div>
      </div>
    </RootLayout>
  );
};

export default BookPage;
