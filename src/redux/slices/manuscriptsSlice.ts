import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ManuscriptsState, Manuscript } from '../../types';

const initialState: ManuscriptsState = {
  items: [],
  isLoading: false,
  error: null,
};

const manuscriptsSlice = createSlice({
  name: 'manuscripts',
  initialState,
  reducers: {
    fetchManuscriptsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchManuscriptsSuccess: (state, action: PayloadAction<Manuscript[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchManuscriptsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchManuscriptsStart, fetchManuscriptsSuccess, fetchManuscriptsFailure } = manuscriptsSlice.actions;
export default manuscriptsSlice.reducer;