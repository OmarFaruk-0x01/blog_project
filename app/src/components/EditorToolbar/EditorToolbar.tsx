import Button from "@ui/Button";
import type { FC } from "react";
import type { EditorToolbarProps } from "./EditorToolbar.interface";
import clsx from "clsx";
import DownArrow from "@icons/DownArrow";
import DropDown from "@ui/DropDown";
import BulletList from "@icons/BulletList";
import BlockQuote from "@icons/BlockQuote";
import Undo from "@icons/Undo";
import Redo from "@icons/Redo";
import OrderedList from "@icons/OrderedList";
import HighlightIcon from "@icons/Highlight";
import LeftAlign from "@icons/LeftAlign";
import CenterAlign from "@icons/CenterAlign";
import RightAlign from "@icons/RightAlign";
import JustifyAlign from "@icons/JustifyAlign";
const EditorToolbar: FC<EditorToolbarProps> = ({ editor }) => {
  const btnClass = clsx("w-[40px] h-[40px] flex items-center justify-center ");
  return (
    <div className="relative z-20 flex items-center justify-start gap-2">
      <div className="relative flex items-center justify-center gap-2 px-2">
        <Button
          className={clsx(btnClass)}
          variant="normal"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          active={editor?.isActive("bold")}
        >
          B
        </Button>
        <Button
          className={clsx(btnClass, "strike")}
          variant="normal"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          active={editor?.isActive("strike")}
        >
          <s>S</s>
        </Button>
        <Button
          className={clsx(btnClass, "italic")}
          variant="normal"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          active={editor?.isActive("italic")}
        >
          I
        </Button>
        <Button
          className={clsx(btnClass, "italic")}
          variant="normal"
          onClick={() => editor?.chain().focus().toggleHighlight().run()}
          active={editor?.isActive("highlight")}
        >
          <HighlightIcon />
        </Button>
      </div>
      <div className="h-[10px] w-[2px] bg-gray-300" />
      <div className="relative flex items-center justify-center gap-2 px-2">
        <Button
          className={clsx(btnClass, "")}
          variant="normal"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          active={editor?.isActive({ textAlign: "left" })}
        >
          <LeftAlign />
        </Button>
        <Button
          className={clsx(btnClass, "")}
          variant="normal"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          active={editor?.isActive({ textAlign: "center" })}
        >
          <CenterAlign />
        </Button>
        <Button
          className={clsx(btnClass, "")}
          variant="normal"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          active={editor?.isActive({ textAlign: "right" })}
        >
          <RightAlign />
        </Button>
      </div>
      {/* <div className="relative flex items-center justify-center gap-2 px-2">
        <Button
          className={clsx(btnClass)}
          variant="normal"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor?.isActive("heading", { level: 1 })}
        >
          H1
        </Button>
        <Button
          className={clsx(btnClass)}
          variant="normal"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor?.isActive("heading", { level: 2 })}
        >
          H2
        </Button>
        <DropDown placeholder="">
          <DropDown.Item className="">
            <Button
              className={clsx(btnClass)}
              variant="normal"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              active={editor?.isActive("heading", { level: 3 })}
            >
              H3
            </Button>
          </DropDown.Item>
          <DropDown.Item className="">
            <Button
              className={clsx(btnClass)}
              variant="normal"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 4 }).run()
              }
              active={editor?.isActive("heading", { level: 4 })}
            >
              H4
            </Button>
          </DropDown.Item>
          <DropDown.Item className="">
            <Button
              className={clsx(btnClass)}
              variant="normal"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 5 }).run()
              }
              active={editor?.isActive("heading", { level: 5 })}
            >
              H5
            </Button>
          </DropDown.Item>
          <DropDown.Item className="">
            <Button
              className={clsx(btnClass)}
              variant="normal"
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 6 }).run()
              }
              active={editor?.isActive("heading", { level: 6 })}
            >
              H6
            </Button>
          </DropDown.Item>
        </DropDown>
      </div> */}
      <div className="h-[10px] w-[2px] bg-gray-300" />
      <div className="relative flex items-center justify-center gap-2 px-2">
        <Button
          className={clsx(btnClass)}
          variant="normal"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          active={editor?.isActive("bulletList")}
        >
          <BulletList width="1.2em" height="1.2em" />
        </Button>
        <Button
          className={clsx(btnClass)}
          variant="normal"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          active={editor?.isActive("orderedList")}
        >
          <OrderedList width="1.2em" height="1.2em" />
        </Button>
        <Button
          className={clsx(btnClass)}
          variant="normal"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          active={editor?.isActive("blockquote")}
        >
          <BlockQuote width="1.2em" height="1.2em" />
        </Button>
      </div>
      <div className="h-[10px] w-[2px] bg-gray-300" />
      <div className="relative flex items-center justify-center gap-2 px-2">
        <Button
          className={clsx(btnClass)}
          variant="normal"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().chain().focus().undo().run()}
        >
          <Undo width="1.2em" height="1.2em" />
        </Button>
        <Button
          className={clsx(btnClass)}
          variant="normal"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().chain().focus().redo().run()}
        >
          <Redo width="1.2em" height="1.2em" />
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
