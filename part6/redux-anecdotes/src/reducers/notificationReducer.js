import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "Hello",
  reducers: {
    notificationChange(state, action) {
      return action.payload ? action.payload : state;
    },
  },
});

export const { notificationChange } = notificationSlice.actions;
export default notificationSlice.reducer;
