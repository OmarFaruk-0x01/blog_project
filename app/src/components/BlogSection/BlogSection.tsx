import BlogItem from "@components/BlogItem";
import GridList from "@ui/GridList";
import type { FC } from "react";
import type { BlogSectionProps } from "./BlogSection.interface";

const BlogSection: FC<BlogSectionProps> = () => {
  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-8">
        <div className="">
          <img
            className="rounded-md"
            src="https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDJ8fG1hcnN8ZW58MHx8fHwxNjQ2Mjc3NjQw&ixlib=rb-1.2.1&q=80&w=1200"
          />
        </div>
        <div>
          <h5 className="mb-3 text-3xl font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias.
          </h5>
          <p className="mb-3 text-xl text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            error autem ex debitis nostrum animi quidem omnis quam officia
            fugiat, quibusdam ut repellat facere perspiciatis laborum! Pariatur
            harum modi molestias Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Beatae sequi soluta ipsa inventore consequuntur
            laborum, nihil nisi dicta facilis dolores? Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Magni corporis aspernatur soluta
            tenetur ea aliquam libero tempora doloribus cum delectus?
          </p>
          <div>
            <span>Lorem, ipsum.</span>
            <span>Lorem.</span>
          </div>
        </div>
      </div>
      <hr className="mt-10 mb-10"/>
      <div className="grid grid-cols-2 gap-2">
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </div>
    </div>
  );
};

export default BlogSection;
