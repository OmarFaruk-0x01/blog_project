import { slugify } from "@helpers/utils";
import Check from "@icons/Check";
import Close from "@icons/Close";
import Delete from "@icons/Delete";
import Edit from "@icons/Edit";
import { Form, useSubmit, useTransition } from "@remix-run/react";
import uiStore from "@store/uiStore";
import Button from "@ui/Button";
import TextInput from "@ui/TextInput";
import MessageDialog from "@components/MessageDialog";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import type { TopicsItemProps } from "./TopicsItem.interface";

const TopicsItem: FC<TopicsItemProps> = ({ topic, index }) => {
  const submit = useSubmit();
  const openDialog = uiStore((state) => state.openDialog);
  const closeDialog = uiStore((state) => state.closeDialog);
  const dialog = uiStore((state) => state.dialog);
  const transition = useTransition();
  const [editable, setEditable] = useState(false);
  const [new_Topic, setNewTopic] = useState({
    label: topic.label,
    slug: topic.slug,
  });

  useEffect(() => {
    if (editable) {
      if (transition.type === "idle") {
        setEditable(false);
      }
    }
    if (!editable && transition.type === "idle" && !!dialog) {
      closeDialog();
    }
    closeDialog();
  }, [transition]);

  const handleChange =
    (field: "label" | "slug") => (ev: ChangeEvent<HTMLInputElement>) => {
      switch (field) {
        case "label": {
          setNewTopic({
            label: ev.target.value,
            slug: slugify(ev.target.value),
          });
        }
        case "slug": {
          setNewTopic((prev) => ({
            ...prev,
            slug: slugify(ev.target.value),
          }));
        }
      }
    };

  const renderInfo = () => {
    if (editable) {
      return (
        <div className="my-2 flex flex-col gap-1">
          <TextInput
            name="label"
            value={new_Topic.label}
            placeholder="label"
            onChange={handleChange("label")}
          />
          <TextInput
            name="slug"
            value={new_Topic.slug}
            placeholder="slug"
            onChange={handleChange("slug")}
          />
          <input name="topicId" value={topic.id} hidden />
        </div>
      );
    } else {
      return (
        <div className="flex h-[50px] items-center p-2">{topic.label}</div>
      );
    }
  };
  const renderButtons = () => {
    if (editable) {
      return (
        <>
          <Button variant="success" type="submit">
            <Check />
          </Button>
          <Button
            variant="error"
            onClick={(ev) => {
              ev.preventDefault();
              setEditable(false);
            }}
          >
            <Close />
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            variant="info"
            onClick={(ev) => {
              ev.preventDefault();
              setEditable(true);
            }}
          >
            <Edit />
          </Button>
          <Button
            variant="error"
            onClick={(ev) => {
              ev.preventDefault();
              openDialog({
                children: (
                  <MessageDialog
                    cancelText="ডিলিট করুন"
                    okText="ফিরে যান"
                    message="আপনি ডিলিট করলে আর ফিরে পাবেন না।"
                    title={`"${topic.label}" ডিলিট করতে চাচ্ছেন?`}
                    onAgree={closeDialog}
                    onCancel={() => {
                      const formData = new FormData();
                      formData.append("topicId", topic.id);
                      formData.append("label", topic.label);
                      submit(formData, { method: "delete" });
                    }}
                  />
                ),
              });
            }}
          >
            <Delete />
          </Button>
        </>
      );
    }
  };
  return (
    <Form
      method={editable ? "patch" : "delete"}
      key={topic.id}
      className="grid grid-cols-[auto_1fr_auto_auto]"
    >
      <div className="flex h-[50px] w-[50px] items-center justify-center p-2">
        {index + 1}.
      </div>
      {renderInfo()}
      <div className="flex h-[50px] w-[100px] items-center p-2">
        {topic.posts.length}
      </div>
      <div className="flex h-[50px] w-[120px] items-center justify-center gap-2 p-2">
        {renderButtons()}
      </div>
    </Form>
  );
};

export default TopicsItem;
