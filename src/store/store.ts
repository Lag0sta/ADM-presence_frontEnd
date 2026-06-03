import { configureStore } from "@reduxjs/toolkit";

import auth from "./reducers/auth.js";
import student from "./reducers/student.js";

// Typage du store
export const store = configureStore({
  reducer: {auth, student},
});

// Définition du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
