import {
  Link,
  useLoaderData,
  useNavigate,
  useTransition,
  useLocation,
} from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/server-runtime";
import { getPostListItems, getPostsForSidebar } from "@/models/post.server";
import BlogCard from "@components/BlogCard";
import HomeSidebar from "@components/HomeSidebar";
import { getTopics } from "@/models/topics.server";
import GridList from "@ui/GridList";
import HomeLayout from "@layout/HomeLayout";
import RootLayout from "@layout/RootLayout";
import {
  getBooks,
  getBooksForSidebar,
  getBooksListItems,
} from "@/models/books.server";
import TopicsSideBar from "@components/TopicsSideBar";
import BooksSideBar from "@components/BooksSideBar";
import BookCard from "@components/BookCard";
import PostsSideBar from "@components/PostsSideBar";
import shuffle from "lodash.shuffle";

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const query = new URL(request.url).searchParams;
  const page = +query.get("page")! || 1;
  const size = +query.get("size")! || 10;
  const books = await getBooksListItems({ page, size });
  const topics = await getTopics();
  const posts = await getPostsForSidebar();
  return json({ posts: shuffle(posts), topics: shuffle(topics), books });
};

function Books() {
  const nav = useNavigate();
  const router = useLocation();
  const {
    posts,
    topics,
    books: { books, currentPage, size, totalPages, totalBooks },
  } = useLoaderData<{
    posts: Awaited<ReturnType<typeof getPostsForSidebar>>;
    topics: Awaited<ReturnType<typeof getTopics>>;
    books: Awaited<ReturnType<typeof getBooksListItems>>;
  }>();
  const moveToNewPage = (page: Number) => {
    const url = `${router.pathname!}?page=${page}`;
    nav(url);
  };
  return (
    <RootLayout>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-[1fr_auto]">
        <div className="px-5">
          {books?.length > 0 ? (
            <GridList
              items={books}
              renderItems={({ createdAt, ...book }) => (
                <BookCard
                  key={book.slug}
                  createdAt={new Date(createdAt)}
                  {...book}
                />
              )}
              currentPage={currentPage}
              itemPerPage={size}
              onNextMove={moveToNewPage}
              onPrevMove={moveToNewPage}
              onPageClick={moveToNewPage}
              totalItem={totalBooks}
              totalPages={totalPages}
              itemPerRow="3"
            />
          ) : (
            <div className="flex w-full items-center justify-center p-10 font-siliguri">
              <span className="text-xl font-thin text-gray-400">
                কোনো বই পাওয়া যায় নি।
              </span>
            </div>
          )}
        </div>
        <div className="w-full p-2 font-siliguri md:w-[350px]">
          <TopicsSideBar topics={topics} />
          <PostsSideBar posts={posts} />
        </div>
      </div>
    </RootLayout>
  );
}
export default Books;
