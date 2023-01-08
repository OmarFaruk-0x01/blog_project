import ArrowRight from "@icons/ArrowRight";
import { Link } from "@remix-run/react";
import Button from "@ui/Button";
import type { FC } from "react";
import type { PostsSideBarProps } from "./PostsSideBar.interface";

const PostsSideBar: FC<PostsSideBarProps> = ({ posts }) => {
  return (
    <div>
      <div className="mt-5 flex items-center justify-between pb-3">
        <h5 className="text-2xl font-semibold">নতুন পোস্ট সমূহ</h5>
        <Link to="/">
          <Button className="text-sm" texture="ghost" endIcon={<ArrowRight />}>
            সকল
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.slug} className="group/post list-none">
            <Link to={`/${post.slug}`} className="w-full ">
              <div className="grid w-full grid-cols-[auto_1fr] gap-2 rounded bg-white p-2 transition-shadow duration-300 group-hover/post:shadow-xl">
                <div className="">
                  <div className="relative h-[100px] w-[120px] rounded">
                    <img
                      src={post.featured_image?.src || "/noImage.png"}
                      className=" h-full w-full rounded object-cover"
                    />
                    <div className="absolute inset-0 rounded bg-primary/20 opacity-0 transition-opacity duration-300 group-hover/post:opacity-100" />
                  </div>
                </div>
                <div className="">
                  <h5 className="text-lg font-semibold transition-colors duration-300 group-hover/post:text-primary">
                    {post.title}
                  </h5>
                </div>
              </div>
            </Link>
          </li>
        ))}
        {/* <li
          key={"unCategorized"}
          className="flex items-center justify-start gap-2 text-gray-500"
        >
          <Link to={`/topics/un_categorized`} className="w-full">
            <Button
              startIcon={<ArrowRight />}
              texture="ghost"
              active={params?.slug === "un_categorized"}
              className="w-full"
            >
              UnCategorized
            </Button>
          </Link>
        </li> */}
      </div>
    </div>
  );
};

export default PostsSideBar;
