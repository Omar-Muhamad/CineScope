import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemData } from "@/types";


export interface DataState {
  loading?: boolean;
  trending?: ItemData[];
  recommendations?: ItemData[];
  error: string | undefined;
}

const initialState: DataState = {
  loading: false,
  trending: [],
  recommendations: [],
  error: undefined,
};

export const fetchTrending = createAsyncThunk(
  "data/fetchTrending",
  async () => {
    try {
      const params = {
        // api_key: process.env.API_KEY,
        api_key: 'fc8a1ee908366a2e7782c9f0ade9e6cd',
        language: "en-US",
      };
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/all/week",
        { params }
      );
      return response.data.results;
    } catch (err) {
      return err;
    }
  }
);

export const fetchRecommendations = createAsyncThunk(
  "data/fetchRecommendations",
  async () => {
    try {
      const params = {
        // api_key: process.env.API_KEY,
        api_key: 'fc8a1ee908366a2e7782c9f0ade9e6cd',
      };
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/693134/recommendations",
        { params }
      );
      return response.data.results;
    } catch (err) {
      return err;
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.loading = false;
        state.trending= action.payload
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations= action.payload
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
