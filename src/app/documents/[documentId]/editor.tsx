"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

const Editor = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "tiptap focus:outline-none bg-white border border-[#C7C7C7] min-h-[1054px] w-[816px] pt-10 pr-14 pb-10",
      },
    },

    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),

      BulletList.configure({ keepMarks: true }),
      OrderedList.configure({ keepMarks: true }),
      ListItem.configure({ keepMarks: true }),

      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],

    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 min-h-screen">
      <div className="flex justify-center w-full py-4 mx-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
  