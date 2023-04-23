import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  type PublicReduxInterface,
  type Robot,
  type Note,
  type User,
} from "~/types/robofriends.types";

const initialState: PublicReduxInterface = {
  robots: [],
  notes: [],
  user: {},
};

const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    setRobots(state, action) {
      state.robots = action.payload as Robot[];
    },
    setNotes(state, action) {
      state.notes = action.payload as Note[];
    },
    setUser(state, action) {
      state.user = action.payload as User;
    },
    searchRobots(state, action: PayloadAction<string>) {
      state.robots = state.robots.filter((robot) =>
        robot.name?.toLowerCase().includes(action.payload)
      );
    },
  },
});

export const { setRobots, searchRobots, setNotes, setUser } =
  publicSlice.actions;
export default publicSlice.reducer;
