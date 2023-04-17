import { configureStore } from "@reduxjs/toolkit";
import robofriendsSlice from "~/reducers/robofriends.reducer";

//# ####################
//* Add Your Slices Here
//# ####################

const rootStore = configureStore({
  reducer: {
    robofriends: robofriendsSlice,
  },
});

//# ####################
//* Add Your Slices Here
//# ####################

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

export default rootStore;
