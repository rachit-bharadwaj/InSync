"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { createPost } from "@/server-actions/post";
import { LoadingButton, UserAvatar } from "../ui";
import { useSession } from "@/hooks";
import { useSubmitPostMutation } from "@/hooks/postMutation";
import { Button } from "../ui/button";

import "./style.css";

export default function Editor() {
  const mutation = useSubmitPostMutation();

  const { user } = useSession();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const handleSubmit = () => {
    mutation.mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-secondary p-5">
      <div className="flex gap-5">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          size={35}
          className="hidden sm:inline"
        />
        <EditorContent
          editor={editor}
          className="w-full max-h-52 overflow-y-auto rounded-2xl bg-background p-5"
        />
      </div>
      <div className="flex justify-end">
        <LoadingButton
          loading={mutation.isPending}
          disabled={!input.trim()}
          onClick={handleSubmit}
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
}
