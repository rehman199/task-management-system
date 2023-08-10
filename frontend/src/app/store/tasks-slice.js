import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (_state, { payload }) => [...payload.tasks],
  },
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
