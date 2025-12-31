import { createSlice } from "@reduxjs/toolkit";

const counting = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    name: "Ray",
    mode: "Hello",
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    sayHi: (state) => {
      state.mode = `Hello`;
    },
    sayGoodbye: (state) => {
      state.mode = `Goodbye`;
    },
  },
});

export const { increment, decrement, reset, sayHi, sayGoodbye } =
  counting.actions;

export default counting.reducer;
