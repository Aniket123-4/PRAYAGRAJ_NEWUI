// src/redux/slices/helpSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/Url";

// Define MenuItem interface at the top of the file
interface MenuItem {
  MenuId: number;
  MenuName: string;
  ParentId: number;
  PageUrl: string;
  Icon: string;
  DisplayNo: number;
}

interface HelpContent {
  id?: number;
  menuId: number;
  menuName: string;
  description: string;
}

interface HelpState {
  content: HelpContent | null;
  menus: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: HelpState = {
  content: null,
  menus: [],
  loading: false,
  error: null,
};

export const fetchMenus = createAsyncThunk("help/fetchMenus", async () => {
  const response = await api.get("menu/get");
  return response.data.data;
});

export const fetchHelpContent = createAsyncThunk(
  "help/fetchContent",
  async (menuId: number) => {
    const response = await api.get(`helpcreation/get?menuId=${menuId}`);
    return response.data.data;
  }
);

export const createHelpContent = createAsyncThunk(
  "help/createContent",
  async (data: { menuId: number; menuName: string; description: string }) => {
    const response = await api.post("helpcreation/create", data);
    return response.data;
  }
);

export const updateHelpContent = createAsyncThunk(
  "help/updateContent",
  async (data: { menuId: number; menuName: string; description: string }) => {
    const response = await api.put("helpcreation/update", data);
    return response.data;
  }
);

const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    resetContent: (state) => {
      state.content = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menus";
      })
      .addCase(fetchHelpContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHelpContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload[0] || null;
      })
      .addCase(fetchHelpContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch help content";
      })
      .addCase(createHelpContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHelpContent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createHelpContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create help content";
      })
      .addCase(updateHelpContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHelpContent.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateHelpContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update help content";
      });
  },
});

export const { resetContent } = helpSlice.actions;
export default helpSlice.reducer;