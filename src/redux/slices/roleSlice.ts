// src/redux/slices/roleSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/Url";

interface Role {
  RoleID: number;
  RoleName: string;
}

interface Permission {
  MenuId: number;
  ParentId: number;
  IsAdd: boolean;
  IsEdit: boolean;
  IsDel: boolean;
  IsView: boolean;
  IsPrint: boolean;
  IsExport: boolean;
  IsRelease: boolean;
  IsPost: boolean;
}

interface RoleDetails {
  RoleID: number;
  RoleName: string;
  permissions: Permission[];
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

export const fetchRoles = createAsyncThunk("role/fetchRoles", async () => {
  const response = await api.get("/roleuser/get");
  return response.data.data;
});

export const fetchRoleDetails = createAsyncThunk(
  "role/fetchRoleDetails",
  async (roleId: number) => {
    const response = await api.get(`/roleuser/get/${roleId}`);
    return response.data.data;
  }
);

export const createRole = createAsyncThunk(
  "role/createRole",
  async (data: {
    roleName: string;
    rolePermission: any[];
    user_ID: string;
    createdDt: string;
    modifyDt: string;
  }) => {
    const response = await api.post("/roleuser/create", data);
    return response.data;
  }
);

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async (data: {
    roleId: number;
    roleName: string;
    rolePermission: any[];
    user_ID: string;
    createdDt: string;
    modifyDt: string;
  }) => {
    const response = await api.put("/roleuser/update", data);
    return response.data;
  }
);

export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (roleId: number) => {
    const response = await api.delete(`/roleuser/delete/${roleId}`);
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

      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create role";
      })

      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update role";
      })

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