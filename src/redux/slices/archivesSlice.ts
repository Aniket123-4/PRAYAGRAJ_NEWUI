import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArchivesState, Archive } from '../../types';

const initialState: ArchivesState = {
  items: [],
  isLoading: false,
  error: null,
};

const archivesSlice = createSlice({
  name: 'archives',
  initialState,
  reducers: {
    fetchArchivesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchArchivesSuccess: (state, action: PayloadAction<Archive[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchArchivesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchArchivesStart, fetchArchivesSuccess, fetchArchivesFailure } = archivesSlice.actions;
export default archivesSlice.reducer;