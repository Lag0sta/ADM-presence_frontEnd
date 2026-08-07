import { configureStore } from "@reduxjs/toolkit";

import auth from "./reducers/auth.js";
import student from "./reducers/students.js";
import attendance from "./reducers/attendance.js";
import attendanceOfTheDay from "./reducers/attendanceOfTheDay.js";
import user from "./reducers/user.js";

// Typage du store
export const store = configureStore({
  reducer: {attendance, attendanceOfTheDay, auth, student, user},
});

// Définition du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
