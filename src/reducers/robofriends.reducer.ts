import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserWithoutEmail } from "~/pages/robofriends";

export type RobotfriendsStore = {
  robots: UserWithoutEmail[];
};

const initialState: RobotfriendsStore = {
  robots: [],
};

const robofriendsSlice = createSlice({
  name: "robofriends",
  initialState,
  reducers: {
    setRobots(state, action: PayloadAction<UserWithoutEmail[]>) {
      state.robots = action.payload;
    },
    searchRobots(state, action: PayloadAction<string>) {
      state.robots = state.robots.filter((robot) =>
        robot.name?.toLowerCase().includes(action.payload)
      );
    },
  },
});

export const { setRobots, searchRobots } = robofriendsSlice.actions;
export default robofriendsSlice.reducer;
