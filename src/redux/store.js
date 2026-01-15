import { configureStore, combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import roomReducer from "./roomSlice";

import storage from "redux-persist/lib/storage"; // localStorage
import { persistReducer, persistStore } from "redux-persist";

// 🔹 Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["room"], // reducers you want to persist
};

// 🔹 Combine reducers
const rootReducer = combineReducers({
  admin: adminReducer,
  room: roomReducer,
});

// 🔹 Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🔹 Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// 🔹 Persistor
export const persistor = persistStore(store);

export default store;
