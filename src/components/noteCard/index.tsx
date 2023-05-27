import { useState } from "react";

import ReactMarkdown from "react-markdown";

import NoteEditor from "../noteEditor";
import { type Note } from "~/types/public.types";
import { useDispatch } from "react-redux";
import { editNote } from "~/reducers/public.reducer";
type NoteCard = {
  note: Note;
  onDelete: () => void;
  topicId: string;
};
const NoteCard = ({ note, topicId, onDelete }: NoteCard) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isEditing, setisEditing] = useState<boolean>(false);
  const onSaveHandler = (newNote: Omit<Note, "id">) => {
    const updateNote = { note: { ...newNote, id: note.id }, topicId };
    dispatch(editNote(updateNote));
    setisEditing(false);
  };
  return (
    <>
      {!isEditing ? (
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
                <button
                  className="btn-warning btn-md btn w-40 "
                  onClick={() => setisEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="btn-error btn-md btn w-40 "
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoteEditor
          onSave={onSaveHandler}
          extraButton={
            <button
              className="btn-warning btn-md btn w-40"
              onClick={() => setisEditing(false)}
            >
              Discard
            </button>
          }
          contentValue={note}
        />
      )}
    </>
  );
};

export default NoteCard;
