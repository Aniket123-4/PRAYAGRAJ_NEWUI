import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/Url";

interface IUser {
  USER_ID?: number;
  RANK_ID: string;
  SUR_NAME: string;
  FIRST_NAME: string;
  MIDDLE_NAME: string;
  SHORT_NAME: string;
  USER_CODE: string;
  DOB: string | null;
  DOA: string | null;
  DOJ: string | null;
  GENDER_ID: number;
  CUR_PHONE: string | null;
  CUR_MOBILE: string;
  EMAIL: string;
  IS_ACTIVE: boolean;
  IS_DELETED: boolean;
  USER_TYPE_ID: number;
  OTP: string;
  EmployeeId: number | null;
  EmployeeUserId: number | null;
  Source: string;
  LOGIN_NAME: string;
  IS_SYSTEM: boolean;
  ORG_ID: string;
  RoleName: string | null;
  PASSWORD?: string;
  CONFIRM_PASSWORD?: string;
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

// Fetch all users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/get/-1");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Fetch single user by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/get/${id}`);
      return response.data.data[0]; // Return first item from data array
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// Create new user
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData: Omit<IUser, "USER_ID">, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/create", userData);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

// Update existing user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData: IUser, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/user/update/${userData.USER_ID}`,
        userData
      );

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/user/delete/${id}`);

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
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch User by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.users.push(action.payload);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.users.findIndex(
            (user) => user.USER_ID === action.payload.USER_ID
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
          if (state.currentUser?.USER_ID === action.payload.USER_ID) {
            state.currentUser = action.payload;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
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
          (user) => user.USER_ID !== action.payload
        );
        if (state.currentUser?.USER_ID === action.payload) {
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
