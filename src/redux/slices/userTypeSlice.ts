import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/Url";

interface UserType {
  id: number;
  name: string;
  code: string;
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

export const fetchUserTypes = createAsyncThunk("usertype/fetchUserTypes", async () => {
  const response = await api.get("/usertype/get");
  return response.data.data;
});

export const createUserType = createAsyncThunk(
  "usertype/createUserType",
  async (data: { name: string; code: string }) => {
    const response = await api.post("usertype/create", data);
    return response.data;
  }
);

export const updateUserType = createAsyncThunk(
  "usertype/updateUserType",
  async (data: { id: number; name: string; code: string }) => {
    const response = await api.put("usertype/update", data);
    return response.data;
  }
);

export const deleteUserType = createAsyncThunk(
  "usertype/deleteUserType",
  async (id: number) => {
    const response = await api.delete(`usertype/delete/${id}`);
    return response.data;
  }
);

const usertypeSlice = createSlice({
  name: "usertype",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

      .addCase(createUserType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUserType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create user type";
      })

      .addCase(updateUserType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update user type";
      })

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

export default usertypeSlice.reducer;



