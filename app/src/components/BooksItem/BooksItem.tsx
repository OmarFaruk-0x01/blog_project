import type { FC } from "react";
import type { BooksItemProps } from "./BooksItem.interface";

const BooksItem: FC<BooksItemProps> = ({ book, index }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 my-2">
      <div className="flex items-start justify-start">
        <img
          src={book.thumbnail?.src}
          alt={book.title}
          className="h-[150px] w-[100px] object-cover rounded"
        />
      </div>
      <div>
        <h5 className="text-2xl font-medium text-black">{book.title}</h5>
        <div className="flex items-center justify-start gap-2">
          <span className="font-medium text-gray-500 ">পৃষ্ঠাঃ </span>
          <span className="font-medium text-black">{book.pages}</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <span className="font-medium text-gray-500 ">লেখকঃ </span>
          <span className="font-medium text-black">{book.author}</span>
        </div>
        <div className="flex items-center justify-start gap-2">
          <span className="font-medium text-gray-500 ">প্রকাশনীঃ</span>
          <span className="font-medium text-black">{book.publication}</span>
        </div>
        <p className="line-clamp-2">{book.description}</p>
      </div>
    </div>
  );
};

export default BooksItem;
