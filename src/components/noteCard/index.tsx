import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "../../utils/api";

type Note = Pick<RouterOutputs["note"]["getAll"][0], "content" | "title">;

const NoteCard = ({ note, onDelete }: { note: Note; onDelete: () => void }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="card  border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
        >
          <h4
            className="collapse-title text-xl font-bold hover:cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {note.title}
          </h4>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        {isExpanded && (
          <div className="card-actions mx-2 flex justify-end">
            <button className="btn-warning btn-md btn w-40 ">Edit</button>
            <button className="btn-error btn-md btn w-40 " onClick={onDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
