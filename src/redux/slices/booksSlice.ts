import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BooksState, Book } from '../../types';

const initialState: BooksState = {
  items: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    total: 0,
    totalPages: 0,
  },
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action: PayloadAction<{ books: Book[]; pagination: any }>) => {
      state.items = action.payload.books;
      state.pagination = action.payload.pagination;
      state.isLoading = false;
      state.error = null;
    },
    fetchBooksFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearBooks: (state) => {
      state.items = [];
      state.error = null;
    },
  },
});

export const { fetchBooksStart, fetchBooksSuccess, fetchBooksFailure, clearBooks } = booksSlice.actions;
export default booksSlice.reducer;