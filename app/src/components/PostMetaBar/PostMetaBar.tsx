import { ChangeEvent, FC, useState } from "react";
import type { PostMetaBarProps } from "./PostMetaBar.interface";
import { useMemo, useEffect } from "react";
import TextInput from "@ui/TextInput";
import TextArea from "@ui/TextArea";
import AutoComplete from "@ui/AutoComplete";
import { Status, Topics } from "@prisma/client";
import useTopics from "@hooks/api/useTopics";
import { useActionData, useFetcher, useSubmit } from "@remix-run/react";
import Button from "@ui/Button";
import Badge from "@ui/Badge";
import DropDown from "@ui/DropDown";
import { useFormikContext } from "formik";
import { PostModel } from "@interfaces/models/post";
import { slugify } from "@helpers/utils";
import { FileResponse } from "@interfaces/models/file";
import { toast } from "react-hot-toast";
import Spin from "@icons/Spin";
import Close from "@icons/Close";

const PostMetaBar: FC<PostMetaBarProps> = () => {
  const fetcher = useFetcher<FileResponse>();
  const formik = useFormikContext<PostModel>();
  const actionData = useActionData<FileResponse>();
  const topics_fetcher = useFetcher<Topics[]>();
  const { topics: _topics, mutate } = useTopics();
  const topics = useMemo(() => _topics || [], [_topics]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [uploadedFileId, setUploadedFileId] = useState<string>("");

  const handleNewTopic = (label: string) => {
    const formData = new FormData();
    formData.set("label", label);
    formData.set("slug", slugify(label));

    topics_fetcher.submit(formData, {
      method: "post",
      action: "/api/topics",
      encType: "multipart/form-data",
    });
  };

  const handleDelete = () => {
    const formData = new FormData();
    if (!!uploadedFileId) {
      formData.append("id", uploadedFileId);
      fetcher.submit(formData, { method: "delete", action: "/api/file" });
      return;
    }
  };

  const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (ev.target.files?.length! > 0) {
      const file = ev.target.files?.item(0)!;
      const blobUrl = URL.createObjectURL(file);
      setSelectedFile(blobUrl);
      formData.append("img", file);
      fetcher.submit(formData, {
        action: "/api/file",
        method: "post",
        encType: "multipart/form-data",
        replace: false,
      });
    }
    return;
  };

  const handleSubmit = (status: Status | "Unpublished") => () => {
    formik.setFieldValue("status", status);
    formik.handleSubmit();
  };

  useEffect(() => {
    if (topics_fetcher.type === "done" && topics_fetcher.state === "idle") {
      mutate?.();
    }
    console.log(topics_fetcher);
  }, [topics_fetcher]);

  useEffect(() => {
    if (fetcher.data?.status === "success") {
      toast.success(fetcher.data.message);
      setSelectedFile(fetcher?.data?.data?.imgSrc || "");
      formik.setFieldValue("featured_image", {
        src: fetcher?.data?.data?.imgSrc,
        publicId: fetcher?.data?.data?.imgId,
      });
      setUploadedFileId(fetcher?.data?.data?.imgId || "");
    } else if (fetcher.data?.status === "failed") {
      setSelectedFile("");
      setUploadedFileId("");
      toast.error(fetcher.data?.error.message || "Something went wrong");
    }
  }, [fetcher.data]);

  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <div>
          {formik.values.status === "Draft" ? (
            <DropDown placeholder={"Save"}>
              <DropDown.Item onClick={handleSubmit("Draft")}>
                Save to Draft
              </DropDown.Item>
              <DropDown.Item onClick={handleSubmit("Published")}>
                Save and Publish
              </DropDown.Item>
            </DropDown>
          ) : (
            <DropDown placeholder={"Unpublished"}>
              <DropDown.Item onClick={handleSubmit("Unpublished")}>
                UnPublished
              </DropDown.Item>
              <DropDown.Item onClick={handleSubmit("Published")}>
                Update and Publish
              </DropDown.Item>
            </DropDown>
          )}
        </div>
      </div>
      <TextInput
        label="Slug"
        name="slug"
        value={formik.values.slug!}
        onChange={formik.handleChange("slug")}
      />

      <TextArea
        label="Short Description"
        rows={5}
        name="short_body"
        value={formik.values.short_body}
        onChange={formik.handleChange}
      />

      <div
        className="group/preview relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-md border-2 border-dotted"
        role="button"
      >
        {!uploadedFileId && (
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/png,image/jpg"
            className="absolute inset-0 top-0 left-0 z-10 cursor-pointer opacity-0"
          />
        )}
        {!!selectedFile ? (
          <div className="relative z-0 h-full w-full">
            {fetcher.state === "submitting" ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] rounded-lg bg-white p-5 text-lg text-primary shadow-md">
                <Spin />
              </div>
            ) : uploadedFileId ? (
              <div className="absolute inset-0 top-0 left-0 z-10 flex cursor-pointer items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover/preview:opacity-100">
                <Button className="z-0" onClick={handleDelete}>
                  <Close />
                </Button>
              </div>
            ) : (
              <div className="absolute inset-0 top-0 left-0 z-10 flex cursor-pointer items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover/preview:opacity-100">
                <Button className="z-0">Change Image</Button>
              </div>
            )}

            <img
              src={selectedFile}
              alt="featured image"
              className="z-0 h-full w-full cursor-pointer object-cover"
            />
          </div>
        ) : (
          <Button className="z-0">Featured Image</Button>
        )}
      </div>
      <AutoComplete
        enableCreateNew
        options={topics}
        values={formik.values.topics}
        loading={topics_fetcher.state === "loading"}
        getFilterLabel={(opt, inp) => {
          return opt.label.toLowerCase().includes(inp);
        }}
        getOptionLabel={(opt) => opt.label}
        placeholder="Topics"
        textInputProps={{ placeholder: "topics.." }}
        onCreateNew={handleNewTopic}
        onItemSelect={(item) => {
          formik.setFieldValue("topics", item);
        }}
      />
    </div>
  );
};

export default PostMetaBar;
