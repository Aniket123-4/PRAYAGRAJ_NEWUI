import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventsState, Event } from '../../types';

const initialState: EventsState = {
  items: [],
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEventsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action: PayloadAction<Event[]>) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchEventsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEventsStart, fetchEventsSuccess, fetchEventsFailure } = eventsSlice.actions;
export default eventsSlice.reducer;