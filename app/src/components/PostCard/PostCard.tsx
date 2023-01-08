import MessageDialog from "@components/MessageDialog";
import Delete from "@icons/Delete";
import Draft from "@icons/Draft";
import Edit from "@icons/Edit";
import View from "@icons/View";
import { Link, useFetcher } from "@remix-run/react";
import uiStore from "@store/uiStore";
import Badge from "@ui/Badge";
import Button from "@ui/Button";
import { FC, useEffect } from "react";
import type { PostCardProps } from "./PostCard.interface";

const PostCard: FC<PostCardProps> = ({
  id,
  body,
  title,
  short_body,
  slug,
  status,
  topics,
  featured_image,
}) => {
  const fetcher = useFetcher();
  const openDialog = uiStore((state) => state.openDialog);
  const closeDialog = uiStore((state) => state.closeDialog);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.type === "done") {
      closeDialog();
    }
  }, [fetcher]);
  return (
    <div
      className="flex min-h-[200px] flex-col rounded bg-white p-3 shadow-md"
      role="button"
    >
      <div className="flex items-center justify-between">
        <Badge
          label={status}
          variant={status === "Draft" ? "info" : "success"}
          startIcon={<Draft />}
        />
        {status === "Published" && (
          <Link to={`/${slug}`}>
            <Button startIcon={<View />} className="text-sm">
              View Post
            </Button>
          </Link>
        )}
      </div>
      <div className="my-3 flex-1">
        <h4 className="text-lg font-semibold">{title || "(Untitled)"}</h4>
        <p className="text-sm text-gray-400 line-clamp-3">{short_body}</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link to={"/admin/posts/new#" + id} className="w-full">
          <Button startIcon={<Edit />} className="w-full justify-center">
            Edit
          </Button>
        </Link>
        <Button
          startIcon={<Delete />}
          className=""
          variant="error"
          onClick={() => {
            openDialog({
              children: (
                <MessageDialog
                  cancelText="কেটে দিন"
                  message="পোস্টটি ডিলেট করলে আপনি আর ফিরে পাবেন না। আপনি কি রাজি?"
                  title={
                    <>
                      <span className="text-primary-50 underline">{`"${title}"`}</span>
                      <span> পোস্টটি ডিলিট করতে চান?</span>
                    </>
                  }
                  okText="মুছে ফেলুন"
                  onCancel={closeDialog}
                  onAgree={() => {
                    const formData = new FormData();
                    formData.append("id", id);
                    fetcher.submit(formData, { method: "delete" });
                    closeDialog();
                  }}
                />
              ),
            });
          }}
        />
      </div>
    </div>
  );
};

export default PostCard;
