import { Link } from "@remix-run/react";
import type { FC } from "react";
import type { BlogItemProps } from "./BlogItem.interface";

const BlogItem: FC<BlogItemProps> = () => {
  return (
    <Link to="#">
      <div className="group/blogItem flex items-start gap-5">
        <div className="w-[130px] bg-red-300">
          <img
            src="https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fG1hcnN8ZW58MHx8fHwxNjQ2Mjc3NjQw&ixlib=rb-1.2.1&q=80&w=1200"
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        <div>
          <h4 className="text-2xl font-semibold transition-all  group-hover/blogItem:text-gray-500 group-hover/blogItem:underline">
            Lorem ipsum dolor, sit amet consectetur .
          </h4>
          <p className="mt-3 flex items-center gap-2 text-gray-400">
            <span>JOSE Walker</span>
            <span>Mar 3, 2020</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
