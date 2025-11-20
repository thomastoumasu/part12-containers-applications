import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from '../store';

const initialState = {
  message: null,
  isAlert: false,
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    set(_state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
  },
});

export const notify = (message: string, isAlert: boolean, time: number) => async (dispatch: AppDispatch) => {
  dispatch(set({ message, isAlert }));
  setTimeout(() => {
    dispatch(clear());
  }, time);
};

export const { set, clear } = slice.actions;
export default slice.reducer;
