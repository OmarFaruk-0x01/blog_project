import { Link } from "@remix-run/react";
import type { FC } from "react";
import type { BookCardProps } from "./BookCard.interface";

const BookCard: FC<BookCardProps> = ({
  title,
  author,
  createdAt,
  description,
  id,
  pages,
  preview_url,
  publication,
  published,
  slug,
  thumbnail,
  updatedAt,
}) => {
  console.log(published);

  return (
    <Link to={`/books/${slug}`}>
      <div className="w-fit font-siliguri text-gray-900 antialiased">
        <div className="group/book relative">
          <img
            src={thumbnail?.src}
            alt={title}
            className="h-[350px] w-[250px] rounded-lg object-cover object-center transition-shadow duration-300 group-hover/book:shadow-2xl"
          />
          <div className="group/bookurl absolute top-5 z-10 h-max min-w-[340px] max-w-[400px]  origin-top-left scale-0 px-4 transition-transform duration-300 group-hover/book:scale-100">
            <div className="rounded-lg bg-white/60 p-6 shadow-lg backdrop-blur-lg">
              <div className="flex items-baseline">
                <span className="inline-block rounded-full bg-teal-200 px-2 text-xs font-semibold  uppercase tracking-wide text-teal-800"></span>
              </div>

              <h4 className="truncate text-xl font-semibold uppercase leading-tight transition-colors duration-300 ">
                {title}
              </h4>

              {!!author && (
                <div className="mt-1">
                  {author}
                  <span className="text-xs text-gray-600"> /লেখক</span>
                </div>
              )}
              {pages && (
                <div className="mt-1">
                  {pages}
                  <span className="text-xs text-gray-600"> /পৃষ্ঠা</span>
                </div>
              )}
              {publication && (
                <div className="mt-1">
                  {publication}
                  <span className="text-xs text-gray-600"> /প্রকাশনী</span>
                </div>
              )}
              {description && (
                <div>
                  <span className="text-sm text-gray-600">বিস্তারিত</span>
                  <p className=" break-all text-sm">
                    {description?.split(" ").slice(0, 20).join(" ")}...
                  </p>
                </div>
              )}
              <div className="mt-4">
                <span className="text-md font-semibold text-teal-600">
                  {published}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
