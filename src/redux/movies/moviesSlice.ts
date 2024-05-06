
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type MovieData = {
  id: number;
  media_type: string;
  backdrop_path: string;
  release_date: string;
  first_air_date: string;
  adult: boolean;
  title: string;
  name: string;
};

interface MovieState {
  loading?: boolean;
  movies?: MovieData[];
  error: string | undefined;
}

const initialState: MovieState = {
  loading: false,
  movies: [],
  error: undefined,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const params = {
      api_key: import.meta.env.VITE_APP_API_KEY,
    };
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      { params }
    );
    return response.data.results;
  } catch (err) {
    return err;
  }
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
