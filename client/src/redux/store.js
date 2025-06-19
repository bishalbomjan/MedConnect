import { configureStore } from "@reduxjs/toolkit";
import boxSlice from "./reducerSlices/boxSlice";
import userSlice from "./reducerSlices/userSlice";

export default configureStore({
  reducer: {
    box: boxSlice,
    user: userSlice,
  },
});
