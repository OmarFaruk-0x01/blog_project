import ArrowRight from "@icons/ArrowRight";
import { Link } from "@remix-run/react";
import Button from "@ui/Button";
import type { FC } from "react";
import type { BooksSideBarProps } from "./BooksSideBar.interface";

const BooksSideBar: FC<BooksSideBarProps> = ({ books }) => {
  return (
    <div>
      <div className="mt-5 flex items-center justify-between pb-3">
        <h5 className="text-2xl font-semibold">বইসমুহ</h5>
        <Link to="/books">
          <Button className="text-sm" texture="ghost" endIcon={<ArrowRight />}>
            সকল
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {books?.map((book) => (
          <li key={book.id} className="list-none  text-gray-500">
            <Link to={`/books/${book.slug}`} className="h-full w-full ">
              <div className="h-full w-[100px] overflow-hidden rounded ">
                <img
                  src={book.thumbnail?.src}
                  className="object-fit h-full w-full"
                />
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

export default BooksSideBar;
