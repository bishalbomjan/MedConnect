import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  token: "",
  isLoggedIn: false,
  role: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      return initialState;
    },
    addLoginDetails: (state, action) => {
      const { token, isLoggedIn } = action.payload;
      const { email, role, _id } = action.payload.user;
      return {
        ...state,
        email: email,
        token: token,
        isLoggedIn: isLoggedIn,
        role: role,
        _id: _id,
      };
    },
  },
});
export const { logoutUser, addLoginDetails } = userSlice.actions;

export default userSlice.reducer;
