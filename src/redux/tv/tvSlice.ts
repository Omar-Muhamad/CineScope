
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type TvData = {
  id: number;
  media_type: string;
  backdrop_path: string;
  release_date: string;
  first_air_date: string;
  adult: boolean;
  title: string;
  name: string;
};

interface DataState {
  loading?: boolean;
  tv?: TvData[];
  error: string | undefined;
}

const initialState: DataState = {
  loading: false,
  tv: [],
  error: undefined,
};

export const fetchTv = createAsyncThunk("tv/fetchTv", async () => {
  try {
    const params = {
      api_key: import.meta.env.VITE_APP_API_KEY,
    };
    const response = await axios.get(
      "https://api.themoviedb.org/3/tv/popular",
      { params }
    );
    return response.data.results;
  } catch (err) {
    return err;
  }
});

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
        state.tv = action.payload;
      })
      .addCase(fetchTv.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tvSlice.reducer;
