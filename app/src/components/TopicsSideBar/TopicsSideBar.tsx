import ArrowRight from "@icons/ArrowRight";
import { Link, useParams } from "@remix-run/react";
import Button from "@ui/Button";
import type { FC } from "react";
import type { TopicsSideBarProps } from "./TopicsSideBar.interface";

const TopicsSideBar: FC<TopicsSideBarProps> = ({ topics }) => {
  const params = useParams();

  return (
    <div>
      <div className="mt-5 flex items-center justify-between pb-3">
        <h5 className="text-2xl font-semibold">প্রসঙ্গসমূহ</h5>
        <Link to="/topics">
          <Button className="text-sm" texture="ghost" endIcon={<ArrowRight />}>
            সকল
          </Button>
        </Link>
      </div>
      <div className="flex gap-2">
        {topics.map((topic) => (
          <li
            key={topic.id}
            className="flex items-center justify-start gap-2 text-gray-500"
          >
            <Link to={`/topics/${topic.id}`} className="w-full">
              <Button active={params?.slug === topic.id} className="w-full">
                {topic.label} ({topic.posts?.length})
              </Button>
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

export default TopicsSideBar;
