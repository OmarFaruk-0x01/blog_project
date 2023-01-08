import { FC, useEffect, useImperativeHandle } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useEditor, EditorContent, Content } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import EditorToolbar from "@components/EditorToolbar";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

export const Editor = forwardRef<
  any,
  { value?: string; onChange: (markdown: string, rawText: string) => void }
>(({ onChange, value }, ref) => {
  const debouncedUpdate = useDebouncedCallback((html: string, raw: string) => {
    onChange(html, raw);
  }, 400);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Placeholder.configure({
        placeholder: "Typing...",
        showOnlyWhenEditable: true,
        emptyNodeClass: 'before-[attr("data-placeholder")]',
      }),
    ],
    editorProps: {
      attributes: {
        class: "m-2 focus:outline-none min-h-[300px]",
      },
    },
    onUpdate: ({ editor, transaction }) => {
      debouncedUpdate(editor.getHTML(), editor.getText());
    },
  });

  useEffect(() => {
    editor?.commands.setContent(value as Content);
  }, [editor, value]);

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="font-siliguri" />
    </div>
  );
});

export default Editor;
