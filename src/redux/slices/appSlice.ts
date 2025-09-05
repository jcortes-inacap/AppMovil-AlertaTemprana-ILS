import { createSlice } from "@reduxjs/toolkit";

type AppState = {}; // vacío por ahora
const initialState: AppState = {};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
