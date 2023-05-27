import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { type Note } from "~/types/public.types";

interface NoteEditor {
  onSave: (note: { title: string; content: string }) => void;
  extraButton?: React.ReactElement | React.ReactNode | undefined;
  contentValue?: Omit<Note, "id">;
}
const NoteEditor = ({
  onSave,
  extraButton = undefined,
  contentValue,
}: NoteEditor) => {
  const [content, setContent] = useState<string>(contentValue?.content ?? "");
  const [title, setTitle] = useState<string>(contentValue?.title ?? "");

  return (
    <div className="card border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note title"
            className="input-primary input input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </h2>
        <CodeMirror
          value={content}
          width="100%"
          height="30vh"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value: string) => setContent(value)}
          className="border border-gray-300"
        />
      </div>

      <div className="card-actions mx-7 mb-5 flex justify-end">
        <button
          onClick={() => {
            onSave({
              title,
              content,
            });
            setContent("");
            setTitle("");
          }}
          className="btn-primary btn-md btn w-40"
          disabled={title.trim().length === 0 || content.trim().length === 0}
        >
          Save
        </button>
        {extraButton}
      </div>
    </div>
  );
};

export default NoteEditor;
