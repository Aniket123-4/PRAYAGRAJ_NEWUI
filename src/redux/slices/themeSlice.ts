import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme, ThemeState } from '../../types';

const initialState: ThemeState = {
  current: 'light',
  systemPreference: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.current = action.payload;
    },
    toggleTheme: (state) => {
      state.current = state.current === 'light' ? 'dark' : 'light';
    },
    setSystemPreference: (state, action: PayloadAction<Theme>) => {
      state.systemPreference = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, setSystemPreference } = themeSlice.actions;
export default themeSlice.reducer;