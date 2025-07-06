"use client";
import React from "react";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      {children}
    </Provider>
  );
};

export default ReduxProvider;
