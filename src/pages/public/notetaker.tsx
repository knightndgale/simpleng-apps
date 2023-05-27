import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
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
import MainContainer from "~/components/layout/MainContainer";
import SideContent from "~/components/layout/SideContent";
import Content from "~/components/layout/Content";

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
        <ul className="menu bg-base-100">
          {topics.length > 0 &&
            topics?.map((topic) => (
              <li
                key={topic.id}
                className={selectedTopic?.id === topic.id ? "bordered" : ""}
              >
                <a
                  className="justify-between"
                  href="#"
                  onClick={(event) => {
                    setNotes(topic.note);
                    setSelectedTopic(topic);
                    event.preventDefault();
                  }}
                >
                  <span className="block w-56 overflow-hidden text-ellipsis whitespace-nowrap sm:w-32 md:w-40 lg:w-60 ">
                    {topic.title}
                  </span>
                </a>
              </li>
            ))}
        </ul>
      </SideContent>
      <Content>
        <>
          <div className="mb-5 hidden bg-secondary p-5 sm:block">
            <h3 className="w-100 whitespace-wrap overflow-hidden text-ellipsis text-lg text-secondary-content   sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              {selectedTopic?.title}
            </h3>
          </div>
          {notes.map((note, idx) => (
            <div key={`note-${idx}`}>
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

          {notes.length !== 5 && <NoteEditor onSave={createNote} />}
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
