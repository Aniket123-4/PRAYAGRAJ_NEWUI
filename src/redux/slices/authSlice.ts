// // src/redux/slices/authSlice.ts

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import api from "../../utils/Url";

// interface LoginPayload {
//   loginName: string;
//   password: string;
// }

// interface RegisterPayload {
//   firstName: string;
//   surName: string;
//   email: string;
//   mobile: string;
//   password: string;
// }

// interface AuthState {
//   token: string | null;
//   user: any | null;
//   permissions: any[] | [];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: AuthState = {
//   token: localStorage.getItem("token"),
//   user: JSON.parse(localStorage.getItem("user") || "null"),
//   permissions: JSON.parse(localStorage.getItem("permissions") || "[]"),
//   loading: false,
//   error: null,
// };

// // LOGIN
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (payload: LoginPayload, { rejectWithValue }) => {
//     try {
//       const response = await api.post("auth/login", payload);
//       const data = response.data;

//       if (data.success) {
//         return {
//           token: data.token,
//           user: data.user,
//           permissions: data.user.permissions || [],
//         };
//       } else {
//         return rejectWithValue(data.message || "Login failed");
//       }
//     } catch (error: any) {
//       return rejectWithValue("Login failed. Please try again.");
//     }
//   }
// );

// // REGISTER
// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (payload: RegisterPayload, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/auth/register", payload);
//       const data = response.data;

//       if (data.success) {
//         toast.success("Registration successful!");
//         return data;
//       } else {
//         return rejectWithValue(data.message || "Registration failed");
//       }
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Registration failed"
//       );
//     }
//   }
// );

// // SLICE
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.permissions = [];
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("permissions");
//     },
//   },
//   extraReducers: (builder) => {
//     // Login handlers
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//         state.permissions = action.payload.permissions;

//         localStorage.setItem("token", action.payload.token);
//         localStorage.setItem("user", JSON.stringify(action.payload.user));
//         localStorage.setItem(
//           "permissions",
//           JSON.stringify(action.payload.permissions)
//         );
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         toast.error(action.payload as string);
//       });

//     // Register handlers
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//         // No state update needed unless user auto-logs in after registration
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         toast.error(action.payload as string);
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;






// src/redux/slices/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/Url";

interface LoginPayload {
  loginName: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  surName: string;
  email: string;
  mobile: string;
  password: string;
}

interface AuthState {
  token: string | null;
  user: any | null;
  permissions: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  permissions: JSON.parse(localStorage.getItem("permissions") || "[]"),
  loading: false,
  error: null,
};

// ✅ LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", payload);
      const data = response.data;

      if (data.success) {
        toast.success("Login successful!");
        return {
          token: data.token,
          user: data.user,
          permissions: data.user.permissions || [],
        };
      } else {
        toast.error(data.message || "Login failed");
        return rejectWithValue(data.message || "Login failed");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", payload);
      const data = response.data;

      if (data.success) {
        toast.success("Registration successful!");
        return data;
      } else {
        toast.error(data.message || "Registration failed");
        return rejectWithValue(data.message || "Registration failed");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.permissions = [];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("permissions");
      toast.info("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.permissions = action.payload.permissions;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem(
          "permissions",
          JSON.stringify(action.payload.permissions)
        );
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
