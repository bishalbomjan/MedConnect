// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import boxSlice from "./reducerSlices/boxSlice";
import userSlice from "./reducerSlices/userSlice";
import reduxLogger from "redux-logger";

// Combine all slices into one reducer
const rootReducer = combineReducers({
  box: boxSlice,
  user: userSlice,
});

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  // You can whitelist only some reducers if you want:
  // whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [reduxLogger],
});

// Create the persistor
export const persistor = persistStore(store);
