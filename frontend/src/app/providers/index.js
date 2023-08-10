"use client";
import store, { persistor } from "@/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
