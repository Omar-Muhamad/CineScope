import { ItemData } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface DataState {
  loading?: boolean;
  searchedData?: ItemData[];
  error: string | undefined;
}

const initialState: DataState = {
  loading: false,
  searchedData: [],
  error: undefined,
};

export const fetchSearch = createAsyncThunk(
  "data/fetchSearch",
  async ({ query }: { query: string }) => {
    try {
      const params = {
        api_key: import.meta.env.VITE_APP_API_KEY,
        query,
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi`,
        { params }
      );
      return response.data.results;
    } catch (err) {
      return err;
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedData = action.payload;
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
