import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import themeSlice from './slices/themeSlice';
import booksSlice from './slices/booksSlice';
import eventsSlice from './slices/eventsSlice';
import noticesSlice from './slices/noticesSlice';
import archivesSlice from './slices/archivesSlice';
import manuscriptsSlice from './slices/manuscriptsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    books: booksSlice,
    events: eventsSlice,
    notices: noticesSlice,
    archives: archivesSlice,
    manuscripts: manuscriptsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;