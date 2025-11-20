import diagnosesService from "../services/diagnoses";
import { AppDispatch } from '../store';

import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    code: "M24.2",
    name: "Disorder of ligament",
    latin: "Morbositas ligamenti",
  }];

const slice = createSlice({
  name: "diagnoses",
  initialState,
  reducers: {
    set(_state, { payload }) {
      return payload;
    },
  },
});

const { set } = slice.actions;

export const initializeDiagnoses = () => {
  return async (dispatch: AppDispatch) => {
    const data = await diagnosesService.getAll();
    // console.log('got diagnoses: ', data);
    dispatch(set(data));
  };
};

export default slice.reducer;
