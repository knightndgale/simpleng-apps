import { combineReducers, configureStore } from "@reduxjs/toolkit";
import robofriendsSlice from "~/reducers/robofriends.reducer";
import publicSlice from "~/reducers/public.reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

//# ####################
//* Add Your Slices Here
//# ####################
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  robofriends: robofriendsSlice,
  publicStore: publicSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const rootStore = configureStore({
  reducer: persistedReducer,
});

//# ####################
//* Add Your Slices Here
//# ####################

export const persistor = persistStore(rootStore);

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

export default rootStore;
