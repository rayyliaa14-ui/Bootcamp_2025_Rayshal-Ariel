import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";

const ReduxStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default ReduxStore;
