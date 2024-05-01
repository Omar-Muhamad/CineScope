import { ItemData } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface DataState {
  loading?: boolean;
  details?: ItemData[];
  error: string | undefined;
}

type Param = string|undefined;

const initialState: DataState = {
  loading: false,
  details: [],
  error: undefined,
};

export const fetchDetails = createAsyncThunk(
  "data/fetchDetails",
  async (params: { mediaType: Param; id: Param }) => {
    const { mediaType, id } = params;
    try {
      const params = {
        // api_key: process.env.API_KEY,
        api_key: "fc8a1ee908366a2e7782c9f0ade9e6cd",
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
  },
});

export default detailsSlice.reducer;
