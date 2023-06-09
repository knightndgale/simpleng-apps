import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { getServerSession } from "next-auth";
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";

import { PUBLIC } from "~/constants/common";
import NoteCard from "~/components/noteCard";
import NoteEditor from "~/components/noteEditor";
import { type RouterOutputs, api } from "~/utils/api";
import { authOptions } from "~/server/auth";
import MainContainer from "~/components/layout/MainContainer";
import Content from "~/components/layout/Content";
import SideContent from "~/components/layout/SideContent";

type Topic = RouterOutputs["topic"]["getAll"][0];

const NoteTaker: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data: Topic[]) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  return (
    <MainContainer>
      <SideContent>
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            placeholder="New Topic"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTopic.mutate({
                  title: e.currentTarget.value,
                });
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
          {topics?.map((topic: Topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedTopic(topic);
                }}
              >
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
      </SideContent>
      <Content>
        <>
          {selectedTopic &&
            notes?.map((note) => (
              <div key={note.id} className="mt-5">
                <NoteCard
                  topicId={selectedTopic.id}
                  note={note}
                  onDelete={() => void deleteNote.mutate({ id: note.id })}
                />
              </div>
            ))}

          <NoteEditor
            onSave={({ title, content }) => {
              void createNote.mutate({
                title,
                content,
                topicId: selectedTopic?.id ?? "",
              });
            }}
          />
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

  if (!session) {
    return {
      redirect: {
        destination: `/${PUBLIC}/notetaker`,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
