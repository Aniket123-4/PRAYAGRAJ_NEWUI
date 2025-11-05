// src/redux/slices/menuSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/Url";

interface MenuItem {
  MenuId: number;
  MenuName: string;
  ParentId: number;
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
}

const initialState: MenuState = {
  menus: [],
  loading: false,
};

export const fetchMenus = createAsyncThunk("menu/fetch", async () => {
  const response = await api.get("/menu/get");
  return response.data.data;
});

export const createMenu = createAsyncThunk(
  "menu/create",
  async (payload: Omit<MenuItem, "MenuId">) => {
    const response = await api.post("/menu/create", payload);
    return response.data;
  }
);

export const updateMenu = createAsyncThunk(
  "menu/update",
  async (payload: MenuItem) => {
    const response = await api.put("/menu/update", payload);
    return response.data;
  }
);

export const deleteMenu = createAsyncThunk(
  "menu/delete",
  async (id: number) => {
    const response = await api.delete(`/menu/delete/${id}`);
    return response.data;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMenus.fulfilled,
        (state, action: PayloadAction<MenuItem[]>) => {
          state.loading = false;
          state.menus = action.payload;
        }
      )
      .addCase(fetchMenus.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default menuSlice.reducer;
