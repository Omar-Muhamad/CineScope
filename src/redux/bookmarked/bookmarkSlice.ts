import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type ItemData = {
  id: number;
  mediaType: string;
  releaseDate: string;
  title: string;
  imageSrc: string;
  ratings: string;
};

export type BookmarkData = ItemData[];

export interface BookmarkState {
  loading: boolean;
  bookmarks: BookmarkData | null;
  status: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  loading: false,
  bookmarks: null,
  status: false,
  error: null,
};

export const fetchBookmark = createAsyncThunk(
  "bookmark/fetchBookmark",
  async () => {
    const params = {
      api_key: import.meta.env.VITE_APP_API_KEY,
    };
    const response = await axios("https://api.themoviedb.org/3/list/8299412", {
      params,
    });

    const data = response.data.items;
    console.log(data);
    return data;
  }
);

export const addBookmark = createAsyncThunk(
  "bookmark/addBookmark",
  async ({ id, media_type, session_id }: { id: number; media_type: string; session_id: string | null }) => {
    const params = {
      api_key: import.meta.env.VITE_APP_API_KEY,
      session_id,
    };
    const response = await axios.post(
      "https://api.themoviedb.org/3/list/8299412/add_item",
      {
        media_id: id,
        media_type,
      },
      { params }
    );

    return response.data;
  }
);

export const removeBookmark = createAsyncThunk(
  "bookmark/removeBookmark",
  async ({ id, media_type, session_id }: { id: number; media_type: string; session_id: string | null }) => {
    const params = {
      api_key: import.meta.env.VITE_APP_API_KEY,
      session_id,
    };
    const response = await axios.post(
      "https://api.themoviedb.org/3/list/8299412/remove_item",
      {
        media_id: id,
        media_type,
      },
      { params }
    );

    return response.data;
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmark.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmark.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmark.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch bookmarked items";
      });
    builder
      .addCase(addBookmark.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.error = null;
      })
      .addCase(addBookmark.fulfilled, (state) => {
        state.loading = false;
        state.status = true;
      })
      .addCase(addBookmark.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error = action.error.message || "Failed to add bookmarked item";
      });
    builder
      .addCase(removeBookmark.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.error = null;
      })
      .addCase(removeBookmark.fulfilled, (state) => {
        state.loading = false;
        state.status = true;
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
        state.error =
          action.error.message || "Failed to remove bookmarked item";
      });
  },
});

export default bookmarkSlice.reducer;
