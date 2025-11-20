import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import notificationReducer from "./reducers/notification";
// import blogsReducer from "./reducers/blogs";
// import userReducer from "./reducers/user";
import diagnosesReducer from "./reducers/diagnoses";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    // blogs: blogsReducer,
    // user: userReducer,
    diagnoses: diagnosesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>;

export default store;