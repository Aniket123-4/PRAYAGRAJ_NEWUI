// src/redux/slices/userTypeSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/Url";

interface UserType {
  _id: string;
  userTypeName: string;
  userTypeCode: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserTypeState {
  usertypes: UserType[];
  loading: boolean;
  error: string | null;
}

const initialState: UserTypeState = {
  usertypes: [],
  loading: false,
  error: null,
};

// Get all user types
export const fetchUserTypes = createAsyncThunk(
  "usertype/fetchUserTypes", 
  async () => {
    const response = await api.post("/userTypes/get");
    return response.data.data;
  }
);

// Create or update user type
export const saveOrUpdateUserType = createAsyncThunk(
  "usertype/saveOrUpdateUserType",
  async (data: { 
    id?: string; 
    userTypeName: string; 
    userTypeCode: string 
  }) => {
    const response = await api.post("/userTypes/save", data);
    return response.data;
  }
);

// Delete user type
export const deleteUserType = createAsyncThunk(
  "usertype/deleteUserType",
  async (id: string) => {
    const response = await api.post("/userTypes/delete", { id });
    return response.data;
  }
);

const usertypeSlice = createSlice({
  name: "usertype",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Types
      .addCase(fetchUserTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.usertypes = action.payload;
      })
      .addCase(fetchUserTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user types";
      })

      // Save or Update User Type
      .addCase(saveOrUpdateUserType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveOrUpdateUserType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveOrUpdateUserType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save user type";
      })

      // Delete User Type
      .addCase(deleteUserType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUserType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete user type";
      });
  },
});

export const { clearError } = usertypeSlice.actions;
export default usertypeSlice.reducer;