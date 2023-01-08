import {
  Link,
  useLoaderData,
  useParams,
  useNavigate,
  useLocation,
} from "@remix-run/react";
import { useOptionalUser } from "@/utils";
import RootLayout from "@layout/RootLayout";
import { json, LoaderFunction } from "@remix-run/server-runtime";
import { getPostListItems } from "@/models/post.server";
import BlogCard from "@components/BlogCard";
import { getTopic, getTopics } from "@/models/topics.server";
import GridList from "@ui/GridList";
import TopicsSideBar from "@components/TopicsSideBar";

type LoaderDataType = {
  posts: Partial<Awaited<ReturnType<typeof getPostListItems>>>;
  topics: Awaited<ReturnType<typeof getTopics>>;
  topic?: Awaited<ReturnType<typeof getTopic>>;
};

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const resp: LoaderDataType = {
    posts: {},
    topics: [],
  };
  const query = new URL(request.url).searchParams;
  const page = +query.get("page")! || 1;
  const size = +query.get("size")! || 10;

  const [posts, topics, topic] = await Promise.allSettled([
    getPostListItems({
      status: "Published",
      topic: params.slug,
      page,
      size,
    }),
    getTopics(),
    getTopic({ id: params.slug! }),
  ]);
  if (posts.status === "fulfilled") {
    resp.posts = posts.value;
  }
  if (topics.status === "fulfilled") {
    resp.topics = topics.value;
  }
  if (topic.status === "fulfilled") {
    resp.topic = topic.value;
  }
  console.log(posts, topics);
  return json(resp);
};

export default function Index() {
  const nav = useNavigate();
  const router = useLocation();
  const params = useParams();
  const {
    posts: { posts, currentPage, size, totalPages, totalPosts },
    topics,
    topic,
  } = useLoaderData<LoaderDataType>();
  const user = useOptionalUser();

  const moveToNewPage = (page: Number) => {
    const url = `${router.pathname!}?page=${page}`;
    nav(url);
  };

  const renderPosts = () => {
    if (posts?.length === 0) {
      return (
        <div className="flex w-full  items-center justify-center p-10 font-siliguri">
          <span className="text-xl font-thin text-gray-400">
            কোনো পোস্ট পাওয়া যায় নি।
          </span>
        </div>
      );
    } else {
      return (
        <GridList
          items={posts!}
          renderItems={(post) => <BlogCard key={post.id} {...post} />}
          currentPage={currentPage!}
          itemPerPage={size!}
          onNextMove={moveToNewPage}
          onPrevMove={moveToNewPage}
          onPageClick={moveToNewPage}
          totalItem={totalPosts!}
          totalPages={totalPages!}
        />
        // <div className=" grid grid-cols-1 gap-10 md:grid-cols-2">

        //   {posts?.map((post) => (
        //     <BlogCard key={post.id} {...post} />
        //   ))}
        // </div>
      );
    }
  };
  return (
    <RootLayout>
      <div className="grid grid-cols-[1fr_auto] font-siliguri">
        <div>{renderPosts()}</div>
        <div className="w-full p-2 font-siliguri md:w-[350px]">
          <TopicsSideBar topics={topics} />
        </div>
      </div>
    </RootLayout>
  );
}
