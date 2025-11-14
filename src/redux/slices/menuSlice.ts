// src/redux/slices/menuSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/Url";

interface MenuItem {
  MenuId: string;
  MenuName: string;
  ParentId: string | number;
  PageUrl: string;
  Icon: string | null;
  DisplayNo: number;
  IsMenu: boolean;
  IsAdd: boolean;
  IsEdit: boolean;
  IsDel: boolean;
  IsView: boolean;
  IsPrint: boolean;
  IsExport: boolean;
  IsRelease: boolean;
  IsPost: boolean;
}

interface MenuState {
  menus: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menus: [],
  loading: false,
  error: null,
};

// Get all menus
export const fetchMenus = createAsyncThunk("menus/fetch", async () => {
  const response = await api.post("/menus/get");
  return response.data.data;
});

// Create or update menu
export const saveMenu = createAsyncThunk(
  "menus/save",
  async (payload: {
    id?: string;
    menuName: string;
    parentId?: string | null;
    pageUrl?: string;
    icon?: string;
    displayOrder?: number;
    isMenu?: boolean;
    defaultPermissions?: {
      isAdd: boolean;
      isEdit: boolean;
      isDel: boolean;
      isView: boolean;
      isPrint: boolean;
      isExport: boolean;
      isRelease: boolean;
      isPost: boolean;
    };
  }) => {
    const response = await api.post("/menus/save", payload);
    return response.data;
  }
);

// Delete menu
export const deleteMenu = createAsyncThunk(
  "menus/delete",
  async (id: string) => {
    const response = await api.post("/menus/delete", { id });
    return response.data;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Menus
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.loading = false;
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menus";
      })

      // Save Menu (Create/Update)
      .addCase(saveMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save menu";
      })

      // Delete Menu
      .addCase(deleteMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMenu.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete menu";
      });
  },
});

export const { clearError } = menuSlice.actions;
export default menuSlice.reducer;