import ReadingBook from "@icons/ReadingBook";
import { Images } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { FC } from "react";
import type { BlogCardProps } from "./BlogCard.interface";

const BlogCard: FC<BlogCardProps> = ({
  title,
  slug,
  body,
  featured_image,
  id,
  short_body,
  status,
  topics,
}) => {
  return (
    <div className="group/blogCard relative font-siliguri">
      <Link to={"/" + slug!}>
        <div className="image-container before:contents-[''] relative rounded-lg shadow-sm duration-300 before:absolute before:inset-0 before:z-50 before:cursor-pointer before:rounded-lg before:transition-all before:duration-300 hover:shadow-lg group-hover/blogCard:before:bg-primary/30">
          <img
            alt={title || ""}
            className="image aspect-video !w-full rounded-lg bg-slate-50 !object-cover"
            src={(featured_image as Images)?.src! || "/noimage.jpg"}
          />
        </div>
        <div className="mt-3">
          <h5 className="pr-10 pb-2 text-lg font-bold text-gray-600 transition-colors duration-300 group-hover/blogCard:text-primary">
            {title}
          </h5>
          <p className="text-gray-500 line-clamp-3">{short_body}</p>
          <div className="flex items-center justify-start gap-2 pt-2 text-gray-400">
            <ReadingBook />
            <span>{0} minute</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
