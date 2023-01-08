import { getBooksForSidebar } from "@/models/books.server";
import { getPostsForSidebar } from "@/models/post.server";
import { getTopics, getTopicsListItems } from "@/models/topics.server";
import BooksSideBar from "@components/BooksSideBar";
import PostsSideBar from "@components/PostsSideBar";
import TopicsSideBar from "@components/TopicsSideBar";
import RootLayout from "@layout/RootLayout";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { json, LoaderArgs } from "@remix-run/server-runtime";
import Button from "@ui/Button";
import GridList from "@ui/GridList";

export const loader = async ({ request }: LoaderArgs) => {
  const query = new URL(request.url).searchParams;
  const page = +query.get("page")! || 1;
  const size = +query.get("size")! || 10;
  const topics = await getTopicsListItems({ page, size });
  const books = await getBooksForSidebar();
  const posts = await getPostsForSidebar();
  return json({ topics, books, posts });
};

const Topics = () => {
  const router = useLocation();
  const nav = useNavigate();
  const {
    topics: { topics, currentPage, size, totalPages, totalTopics },
    books,
    posts,
  } = useLoaderData<typeof loader>();
  const moveToNewPage = (page: Number) => {
    const url = `${router.pathname!}?page=${page}`;
    nav(url);
  };
  return (
    <RootLayout>
      <div className="grid grid-cols-[1fr_auto] gap-2 font-siliguri">
        <div className="flex flex-col">
          <GridList
            items={topics}
            renderItems={(topic) => (
              <Link to={`/topics/${topic.id}`}>
                <div className="border-b p-5 hover:bg-primary-50">
                  {topic.label}
                </div>
              </Link>
            )}
            currentPage={currentPage}
            itemPerPage={size}
            onNextMove={moveToNewPage}
            onPrevMove={moveToNewPage}
            onPageClick={moveToNewPage}
            totalItem={totalTopics}
            totalPages={totalPages}
            itemPerRow="3"
          />
        </div>
        <div className="w-full p-2 font-siliguri md:w-[350px]">
          <BooksSideBar books={books} />
          <PostsSideBar posts={posts} />
        </div>
      </div>
    </RootLayout>
  );
};

export default Topics;
