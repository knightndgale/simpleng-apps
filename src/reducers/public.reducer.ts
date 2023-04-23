import { type User } from "@prisma/client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type Topic,
  type PublicReduxInterface,
  type Robot,
} from "~/types/robofriends.types";

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
    setNotes(state, action) {
      state.topics = action.payload as Topic[];
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

export const { setRobots, searchRobots, setNotes, setUser } =
  publicSlice.actions;
export default publicSlice.reducer;
