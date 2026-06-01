import { configureStore } from "@reduxjs/toolkit";

import auth from "./reducers/auth.js";
// Typage du store
export const store = configureStore({
  reducer: {auth},
});

// Définition du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
