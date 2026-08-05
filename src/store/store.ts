import { configureStore } from "@reduxjs/toolkit";

import auth from "./reducers/auth.js";
import student from "./reducers/student.js";
import attendance from "./reducers/attendance.js";
import attendanceOfTheDay from "./reducers/attendanceOfTheDay.js";

// Typage du store
export const store = configureStore({
  reducer: {attendance, attendanceOfTheDay, auth, student},
});

// Définition du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
