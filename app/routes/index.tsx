import {
  Link,
  useLoaderData,
  useNavigate,
  useTransition,
  useLocation,
} from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/server-runtime";
import { getPostListItems } from "@/models/post.server";
import BlogCard from "@components/BlogCard";
import HomeSidebar from "@components/HomeSidebar";
import { getTopics } from "@/models/topics.server";
import GridList from "@ui/GridList";
import HomeLayout from "@layout/HomeLayout";
import RootLayout from "@layout/RootLayout";
import { getBooks, getBooksForSidebar } from "@/models/books.server";
import TopicsSideBar from "@components/TopicsSideBar";
import BooksSideBar from "@components/BooksSideBar";

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const query = new URL(request.url).searchParams;
  const page = +query.get("page")! || 1;
  const size = +query.get("size")! || 10;
  const posts = await getPostListItems({ status: "Published", page, size });
  const topics = await getTopics();
  const books = await getBooksForSidebar();
  return json({ posts, topics, books });
};

function Index() {
  const nav = useNavigate();
  const router = useLocation();
  const {
    posts: { posts, currentPage, size, totalPages, totalPosts },
    topics,
    books,
  } = useLoaderData<{
    posts: Awaited<ReturnType<typeof getPostListItems>>;
    topics: Awaited<ReturnType<typeof getTopics>>;
    books: Awaited<ReturnType<typeof getBooksForSidebar>>;
  }>();
  const moveToNewPage = (page: Number) => {
    const url = `${router.pathname!}?page=${page}`;
    nav(url);
  };
  return (
    <RootLayout>
      <div className="grid grid-cols-1 gap-1 md:grid-cols-[1fr_auto]">
        <div className="px-5">
          {posts?.length > 0 ? (
            <GridList
              items={posts}
              renderItems={(post) => <BlogCard key={post.id} {...post} />}
              currentPage={currentPage}
              itemPerPage={size}
              onNextMove={moveToNewPage}
              onPrevMove={moveToNewPage}
              onPageClick={moveToNewPage}
              totalItem={totalPosts}
              totalPages={totalPages}
            />
          ) : (
            <div className="flex w-full items-center justify-center p-10 font-siliguri">
              <span className="text-xl font-thin text-gray-400">
                কোনো পোস্ট পাওয়া যায় নি।
              </span>
            </div>
          )}
        </div>
        <div className="w-full p-2 font-siliguri md:w-[350px]">
          <TopicsSideBar topics={topics} />
          <BooksSideBar books={books} />
        </div>
      </div>
    </RootLayout>
  );
}
export default Index;
