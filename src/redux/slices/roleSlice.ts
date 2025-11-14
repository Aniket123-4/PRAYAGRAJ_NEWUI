// src/redux/slices/roleSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/Url";

interface Role {
  _id: string;
  roleName: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Permission {
  menuId: string;
  parentId?: string;
  isAdd: boolean;
  isEdit: boolean;
  isDel: boolean;
  isView: boolean;
  isPrint: boolean;
  isExport: boolean;
  isRelease: boolean;
  isPost: boolean;
}

interface RoleDetails {
  _id: string;
  roleName: string;
  permissions: Permission[];
  createdBy?: any;
  createdAt?: string;
  updatedAt?: string;
}

interface RoleState {
  roles: Role[];
  currentRole: RoleDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  currentRole: null,
  loading: false,
  error: null,
};

// ✅ Fetch all roles - send empty object to avoid destructuring error
export const fetchRoles = createAsyncThunk("role/fetchRoles", async () => {
  const response = await api.post("/roles/get", {}); // Send empty object
  return response.data.data;
});

// ✅ Fetch specific role details
export const fetchRoleDetails = createAsyncThunk(
  "role/fetchRoleDetails",
  async (roleId: string) => {
    const response = await api.post("/roles/get", { id: roleId });
    return response.data.data;
  }
);

// ✅ Create or update role (both handled by /save)
export const saveRole = createAsyncThunk(
  "role/saveRole",
  async (data: {
    id?: string;
    roleName: string;
    permissions: Permission[];
    userId: string;
  }) => {
    const response = await api.post("/roles/save", data);
    return response.data;
  }
);

// ✅ Delete role
export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (roleId: string) => {
    const response = await api.post("/roles/delete", { id: roleId });
    return response.data;
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    clearCurrentRole: (state) => {
      state.currentRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch roles";
      })

      // Fetch role details
      .addCase(fetchRoleDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoleDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRole = action.payload;
      })
      .addCase(fetchRoleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch role details";
      })

      // Save (Create/Update)
      .addCase(saveRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save role";
      })

      // Delete role
      .addCase(deleteRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete role";
      });
  },
});

export const { clearCurrentRole } = roleSlice.actions;
export default roleSlice.reducer;