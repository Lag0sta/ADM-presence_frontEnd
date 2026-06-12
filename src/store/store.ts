import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
 
import auth from "./reducers/auth.js";
import student from "./reducers/student.js";
import attendance from "./reducers/attendance.js";

// Typage du store
const rootReducer = combineReducers({
  auth,
  student,
  attendance,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;