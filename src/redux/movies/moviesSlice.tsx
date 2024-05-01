import { ItemData } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export interface DataState {
  loading?: boolean;
  movies?: ItemData[];
  error: string | undefined;
}

const initialState: DataState = {
  loading: false,
  movies: [],
  error: undefined,
};

export const fetchMovies = createAsyncThunk(
  "data/fetchMovies",
  async () => {
    try {
      const params = {
        // api_key: process.env.API_KEY,
        api_key: 'fc8a1ee908366a2e7782c9f0ade9e6cd'
      };
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        { params }
      );
      return response.data.results;
    } catch (err) {
      return err;
    }
  }
);

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
        state.movies= action.payload
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
