import { ItemData } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export interface DataState {
  loading?: boolean;
  tv?: ItemData[];
  error: string | undefined;
}

const initialState: DataState = {
  loading: false,
  tv: [],
  error: undefined,
};

export const fetchTv = createAsyncThunk(
  "data/fetchTv",
  async () => {
    try {
      const params = {
        // api_key: process.env.API_KEY,
        api_key: 'fc8a1ee908366a2e7782c9f0ade9e6cd'
      };
      const response = await axios.get(
        "https://api.themoviedb.org/3/tv/popular",
        { params }
      );
      return response.data.results;
    } catch (err) {
      return err;
    }
  }
);

export const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTv.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTv.fulfilled, (state, action) => {
        state.loading = false;
        state.tv= action.payload
      })
      .addCase(fetchTv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tvSlice.reducer;
