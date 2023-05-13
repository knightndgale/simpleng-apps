import { DocumentPlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4, stringify as uuidStringify } from "uuid";
import { useEffect, useState } from "react";
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useDispatch, useSelector } from "react-redux";
import { setTopics, addNote, deleteNote } from "~/reducers/public.reducer";
import NoteCard from "~/components/noteCard";
import NoteEditor from "~/components/noteEditor";
import { authOptions } from "~/server/auth";
import { type RootState } from "~/store/root.store";
import { type Notes, type Topic } from "~/types/public.types";

const NoteTaker: React.FC = () => {
  const dispatch = useDispatch();

  const topics = useSelector((state: RootState) => state.publicStore.topics);

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [notes, setNotes] = useState<Notes[] | null>(null);

  const refreshNotes = () => {
    topics.forEach((topic) => {
      if (topic.id === selectedTopic?.id) setNotes(topic.note);
    });
  };

  useEffect(() => refreshNotes(), [topics]);

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-4 pt-5 sm:col-span-1 ">
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            placeholder="New Topic"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const topic: Topic = {
                  id: uuidv4(),
                  title: e.currentTarget.value,
                  note: [],
                };
                dispatch(setTopics(topic));
                e.currentTarget.value = "";
              }
            }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <DocumentPlusIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="divider"></div>
        <ul className="w-100 menu rounded-box bg-base-100">
          {topics.length > 0 &&
            topics?.map((topic) => (
              <li key={topic.id}>
                <a
                  className="justify-between"
                  href="#"
                  onClick={(event) => {
                    setNotes(topic.note);
                    setSelectedTopic(topic);
                    event.preventDefault();
                  }}
                >
                  {topic.title}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-span-4 gap-3 sm:col-span-3 ">
        <div>
          {notes &&
            notes.map((note, idx) => (
              <div key={`note-${idx}`} className="mt-5">
                <NoteCard
                  note={note}
                  onDelete={() => {
                    if (!selectedTopic) return;
                    dispatch(
                      deleteNote({ topicId: selectedTopic.id, noteId: note.id })
                    );
                  }}
                />
              </div>
            ))}
        </div>

        <NoteEditor
          onSave={(note) => {
            if (selectedTopic) {
              const newNote = { ...note, id: uuidv4() };
              dispatch(addNote({ id: selectedTopic.id, note: newNote }));
            }
          }}
        />
      </div>
    </div>
  );
};

export default NoteTaker;

//* Documentation
//* https://next-auth.js.org/tutorials/securing-pages-and-api-routes#server-side
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: `/notetaker`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
