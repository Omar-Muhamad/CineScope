import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./home/homeSlice";
import moviesSlice from "./movies/moviesSlice";
import tvSlice from "./tv/tvSlice";

export const store = configureStore({
  reducer: {
    home: homeSlice,
    movies: moviesSlice,
    tv: tvSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
