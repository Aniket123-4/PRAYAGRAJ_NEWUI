import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoticesState, Notice } from '../../types';

const initialState: NoticesState = {
  items: [],
  isLoading: false,
  error: null,
};

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    fetchNoticesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchNoticesSuccess: (state, action: PayloadAction<Notice[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchNoticesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchNoticesStart, fetchNoticesSuccess, fetchNoticesFailure } = noticesSlice.actions;
export default noticesSlice.reducer;