import { ItemData } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchRecommendations } from "../home/homeSlice";

export interface DataState {
  loading?: boolean;
  details?: ItemData[];
  recommendations?: ItemData[];
  error: string | undefined;
}

type Param = string | undefined;

const initialState: DataState = {
  loading: false,
  details: [],
  error: undefined,
};

export const fetchDetails = createAsyncThunk(
  "data/fetchDetails",
  async ({ mediaType, id }: { mediaType: Param; id: Param }) => {
    try {
      const params = {
        api_key: import.meta.env.VITE_APP_API_KEY,
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}`,
        { params }
      );
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.recommendations = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default detailsSlice.reducer;
