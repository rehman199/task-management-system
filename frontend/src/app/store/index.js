import authReducer from "@/app/store/auth-slice";
import storage from "@/app/store/storage";
import taskReducer from "@/app/store/tasks-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = persistReducer(
  { key: "root", storage },
  combineReducers({
    auth: authReducer,
    tasks: taskReducer,
  })
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export default store;
