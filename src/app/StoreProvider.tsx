"use client";

import { Provider } from "react-redux";
import store from "../Redux/store";
import React from "react";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>{children}</Provider>
    </React.StrictMode>
  );
};

export default StoreProvider;
