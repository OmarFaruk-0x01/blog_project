import { deletePost, getPostListItems } from "@/models/post.server";
import { requireUserId } from "@/session.server";
import PostCard from "@components/PostCard";
import Add from "@icons/Add";
import Delete from "@icons/Delete";
import DownArrow from "@icons/DownArrow";
import Draft from "@icons/Draft";
import Edit from "@icons/Edit";
import FilterCircle from "@icons/FilterCircle";
import View from "@icons/View";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import {
  ActionFunction,
  json,
  LoaderFunction,
} from "@remix-run/server-runtime";
import Badge from "@ui/Badge";
import Button from "@ui/Button";
import GridList from "@ui/GridList";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const query = new URL(request.url).searchParams;
  const page = +query.get("page")! || 1;
  const size = +query.get("size")! || 10;
  console.log(page, size);
  
  try {
    const posts = await getPostListItems({ status: undefined, page, size });
    return json({ posts });
  } catch (err) {
    console.log(err);

    return json({});
  }
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  try {
    switch (request.method.toLowerCase()) {
      case "delete":
        const data = await request.formData();
        const postId = data.get("id") as string;
        if (postId) {
          await deletePost({ id: postId, userId });
          console.log("Post Deleted");
          return json({});
        }
        return;
    }
  } catch (err) {
    return json({});
  }
};

const Posts = () => {
  const nav = useNavigate();
  const router = useLocation();
  const {
    posts: { posts, currentPage, size, totalPages, totalPosts },
  } = useLoaderData<{
    posts: Awaited<ReturnType<typeof getPostListItems>>;
  }>();

  const moveToNewPage = (page: Number) => {
    const url = `${router.pathname!}?page=${page}`;
    nav(url);
  };

  const renderPosts = () => {
    if (posts.length === 0) {
      return (
        <div className="flex w-full items-center justify-center p-10">
          <span className="text-xl font-thin text-gray-400">
            কোনো পোস্ট পাওয়া যায় নি।
          </span>
        </div>
      );
    } else {
      return (
        <GridList
          items={posts}
          renderItems={(post) => <PostCard {...post} key={post.slug} />}
          currentPage={currentPage}
          itemPerPage={size}
          onNextMove={moveToNewPage}
          onPrevMove={moveToNewPage}
          onPageClick={moveToNewPage}
          totalItem={totalPosts}
          totalPages={totalPages}
        />
        // <div className=" grid grid-cols-1 gap-10 md:grid-cols-2">
        //   {posts.map()}
        // </div>
      );
    }
  };

  return (
    <div className="font-siliguri">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-semibold">Posts</h3>
        <Link to={`/admin/posts/new`}>
          <Button startIcon={<Add />} active>
            New Post
          </Button>
        </Link>
      </div>
      {renderPosts()}
    </div>
  );
};

export default Posts;
