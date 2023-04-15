import { configureStore } from "@reduxjs/toolkit";
import robofriendsSlice from "~/reducers/robofriends.reducer";

const rootStore = configureStore({
  reducer: {
    robofriends: robofriendsSlice,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

export default rootStore;
