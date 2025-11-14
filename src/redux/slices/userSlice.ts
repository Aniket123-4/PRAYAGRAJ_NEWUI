import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/Url";

interface IPermission {
  menuId: string;
  isAdd: boolean;
  isEdit: boolean;
  isDel: boolean;
  isView: boolean;
  isPrint: boolean;
  isExport: boolean;
  isRelease: boolean;
  isPost: boolean;
}

interface IUser {
  _id?: string;
  id?: string;
  loginName: string;
  password?: string;
  isSystem: boolean;
  orgId: string;
  firstName: string;
  surName: string;
  middleName?: string;
  shortName?: string;
  userCode?: string;
  email: string;
  dob?: string | null;
  doj?: string | null;
  curMobile?: string;
  genderId?: string;
  isActive: boolean;
  isDeleted: boolean;
  userType: string;
  roles: string[];
  userSpecificPermissions: IPermission[];
  employeeId?: string;
  EmployeeUserId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface UserState {
  users: IUser[];
  currentUser: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

// Save user (create or update)
export const saveUser = createAsyncThunk(
  "user/saveUser",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/save", userData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save user"
      );
    }
  }
);

// Get users (all or single)
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (id?: string, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/get", { id });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Delete user (soft delete)
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.post("/users/delete", { id });
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Save User (Create/Update)
      .addCase(saveUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload._id) {
          // Update existing user
          const index = state.users.findIndex(
            (user) => user._id === action.payload._id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          } else {
            state.users.push(action.payload);
          }
          if (state.currentUser?._id === action.payload._id) {
            state.currentUser = action.payload;
          }
        } else {
          // Add new user
          state.users.push(action.payload);
        }
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          // Multiple users
          state.users = action.payload;
        } else {
          // Single user
          state.currentUser = action.payload;
        }
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
        if (state.currentUser?._id === action.payload) {
          state.currentUser = null;
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;