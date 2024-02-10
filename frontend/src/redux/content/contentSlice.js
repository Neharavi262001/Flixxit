import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  genres: {},
  loadingGenres: 'idle',
  errorGenres: null,
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    fetchUrl: (state, action) => {
      state.url = action.payload;
    },

    fetchGenres:(state, action) => {
      state.genres = action.payload;
  },

  },
});

export const { fetchUrl,fetchGenres } = contentSlice.actions;
export default contentSlice.reducer;