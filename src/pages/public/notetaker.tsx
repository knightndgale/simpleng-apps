import { DocumentPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import NoteTakerFallback from "~/images/stock/notes-fallback.jpeg";

import { authOptions } from "~/server/auth";

import {
  setTopics,
  addNote,
  deleteNote,
  deleteTopic,
} from "~/reducers/public.reducer";
import NoteCard from "~/components/noteCard";
import NoteEditor from "~/components/noteEditor";

import MainContainer from "~/components/layout/MainContainer";
import SideContent from "~/components/layout/SideContent";
import Content from "~/components/layout/Content";

import { type RootState } from "~/store/root.store";
import { type Notes, type Topic } from "~/types/public.types";

const NoteTaker: React.FC = () => {
  const dispatch = useDispatch();
  const [topicInput, setTopicInput] = useState("");
  const topics = useSelector((state: RootState) => state.publicStore.topics);
  const currentTopic = topics.length > 0 ? topics[0] : null;
  const [selectedTopic, setSelectedTopic] = useState<Topic | null | undefined>(
    currentTopic
  );
  const [notes, setNotes] = useState<Notes[]>([]);

  const refreshNotes = () => {
    setSelectedTopic(topics.at(-1));
    topics.forEach((topic) => {
      if (topic.id === selectedTopic?.id) setNotes(topic.note);
    });
  };

  const createTopic = () => {
    if (topics.length === 5) return;
    const topic: Topic = {
      id: uuidv4(),
      title: topicInput,
      note: [],
    };
    dispatch(setTopics(topic));
    setTopicInput("");
  };

  const createNote = (note: Pick<Notes, "title" | "content">) => {
    if (notes.length === 5) return;
    if (selectedTopic) {
      const newNote = { ...note, id: uuidv4() };
      dispatch(addNote({ id: selectedTopic.id, note: newNote }));
    }
  };

  useEffect(() => refreshNotes(), [topics]);

  return (
    <MainContainer>
      <SideContent>
        <div className="relative">
          <input
            value={topicInput}
            onChange={(e) => setTopicInput(e.currentTarget.value)}
            type="text"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-primary-focus focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
            placeholder="New Topic"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <DocumentPlusIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
        <button
          disabled={topics.length === 5 ?? false}
          className="btn-primary btn-sm btn mt-2  w-full rounded-md "
          onClick={() => createTopic()}
        >
          Add Topic
        </button>

        <div className="divider"></div>
        <ul className="bg-base-100">
          {topics.length > 0 &&
            topics?.map((topic) => (
              <li
                key={topic.id}
                className={`mb-2 flex flex-row justify-between p-3  ${
                  selectedTopic?.id === topic.id
                    ? "border-l-4 border-primary-focus bg-primary-content"
                    : ""
                }`}
              >
                <a
                  href="#"
                  onClick={(event) => {
                    setNotes(topic.note);
                    setSelectedTopic(topic);
                    event.preventDefault();
                  }}
                  className="peer"
                >
                  <span className="block w-56 overflow-hidden text-ellipsis whitespace-nowrap sm:w-24 md:w-32 lg:w-52 xl:w-60">
                    {topic.title}
                  </span>
                </a>
                <TrashIcon
                  className={`h-5 w-5 self-center text-error hover:cursor-pointer ${
                    selectedTopic?.id === topic.id ? "block" : "hidden"
                  }`}
                  aria-hidden="true"
                  onClick={() => {
                    dispatch(deleteTopic(topic.id));
                    if (topics.length > 0) return setSelectedTopic(null);
                    setSelectedTopic(topics[0]);
                  }}
                />
              </li>
            ))}
        </ul>
      </SideContent>
      <Content>
        <>
          {selectedTopic?.title && (
            <h3 className="w-100 whitespace-wrap mb-5 hidden overflow-hidden text-ellipsis text-lg text-secondary-content sm:block   sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              {selectedTopic?.title}
            </h3>
          )}

          {notes.map((note, idx) => (
            <section key={`note-${idx}`} className="mb-5">
              <NoteCard
                note={note}
                onDelete={() => {
                  if (!selectedTopic) return;
                  dispatch(
                    deleteNote({ topicId: selectedTopic.id, noteId: note.id })
                  );
                }}
              />
            </section>
          ))}

          {notes.length !== 5 && topics.length > 0 ? (
            <NoteEditor onSave={createNote} />
          ) : (
            <Image
              src={NoteTakerFallback}
              alt="notetaker-fallback"
              className=" max-w-full rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            />
          )}
        </>
      </Content>
    </MainContainer>
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
