import { type User } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type Topic,
  type PublicReduxInterface,
  type EditNote,
  type Note,
} from "~/types/public.types";
import { type Robot } from "~/types/robofriends.types";

const initialState: PublicReduxInterface = {
  robots: [],
  topics: [],
  user: undefined,
  clarifai: {
    counter: 0,
  },
};

const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    setRobots(state, action) {
      state.robots = action.payload as Robot[];
    },

    setTopics(state, action) {
      state.topics.push(action.payload as Topic);
    },
    addNote(state, action) {
      const { id, note } = action.payload as { id: string; note: Note };
      state.topics.map((topic) => {
        if (topic.id === id) {
          topic.note.push(note);
        }
      });
    },
    editNote(state, action) {
      const { topicId, note } = action.payload as EditNote;
      const updatedTopics = state.topics.map((topic) => {
        if (topic.id === topicId) {
          return {
            ...topic,
            note: topic.note.map((topicNote) =>
              topicNote.id === note.id ? { ...note } : topicNote
            ),
          };
        }
        return topic;
      });

      state.topics = updatedTopics;
    },
    deleteNote(state, action) {
      const { topicId, noteId } = action.payload as {
        topicId: string;
        noteId: string;
      };
      state.topics.map((topic) => {
        if (topic.id === topicId) {
          topic.note = topic.note.filter((data) => data.id !== noteId);
        }
      });
    },
    deleteTopic(state, action) {
      state.topics = state.topics.filter(
        (topic) => topic.id !== action.payload
      );
    },
    setUser(state, action) {
      state.user = action.payload as Partial<Pick<User, "email" | "name">>;
    },
    searchRobots(state, action: PayloadAction<string>) {
      state.robots = state.robots.filter((robot) =>
        robot.name?.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    incrementClarifaiCounter(state) {
      state.clarifai.counter++;
    },
    resetClarifaiCounter(state) {
      state.clarifai.counter = 0;
    },
  },
});

export const {
  setRobots,
  searchRobots,
  setTopics,
  setUser,
  addNote,
  deleteNote,
  deleteTopic,
  editNote,
} = publicSlice.actions;
export default publicSlice.reducer;
