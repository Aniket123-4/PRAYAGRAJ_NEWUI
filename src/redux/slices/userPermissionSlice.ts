// src/redux/slices/userPermissionSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/Url";
import { PermissionRow, PermissionKey } from '../../types/userPermissionTypes';

interface MenuPermission {
  menuId: number;
  isAdd: boolean;
  isEdit: boolean;
  isDel: boolean;
  isPrint: boolean;
}

interface User {
  USER_ID: string;
  FIRST_NAME: string;
  MIDDLE_NAME: string;
  SUR_NAME: string;
  RANK_ID: string;
}

interface RoleOption {
  value: string;
  label: string;
}

interface Menu {
  MenuId: number;
  MenuName: string;
  ParentId: number;
}

interface UserPermissionState {
  menuData: Menu[];
  users: User[];
  employeeId: string;
  enteredEmployeeName: User | null;
  roleOptions: RoleOption[];
  selectedRoleID: string;
  selectedRoleData: PermissionRow[];
  isLoading: boolean;
  records: any[];
  menupermissions: MenuPermission | null;
}

const initialState: UserPermissionState = {
  menuData: [],
  users: [],
  employeeId: "",
  enteredEmployeeName: null,
  roleOptions: [],
  selectedRoleID: "",
  selectedRoleData: [],
  isLoading: true,
  records: [],
  menupermissions: null,
};


export const fetchMenuData = createAsyncThunk(
  "userPermission/fetchMenuData",
  async () => {
    const response = await api.get(`menu/get`);
    return response.data.data;
  }
);

export const fetchUsers = createAsyncThunk(
  "userPermission/fetchUsers",
  async () => {
    const response = await api.get("/user/get/-1");
    return response.data.data.map((user: any) => ({
      ...user,
      USER_ID: user.USER_ID || user.id,
    }));
  }
);

export const fetchRoles = createAsyncThunk(
  "userPermission/fetchRoles",
  async () => {
    const response = await api.get(`roleUser/get`);
    return response.data.data.map((role: any) => ({
      label: role.roleName,
      value: role.id,
    }));
  }
);

export const fetchUserPermissions = createAsyncThunk(
  "userPermission/fetchUserPermissions",
  async (userId: string, { getState }) => {
    const state = getState() as { userPermission: UserPermissionState };
    const response = await api.get(`userpermission/get/${userId}`);
    return {
      permissions: response.data.data || [],
      menuData: state.userPermission.menuData,
      userId
    };
  }
);

export const fetchRolePermissions = createAsyncThunk(
  "userPermission/fetchRolePermissions",
  async (roleId: string, { getState }) => {
    const state = getState() as { userPermission: UserPermissionState };
    const response = await api.get(`roleUser/get/${roleId}`);
    return {
      roleData: response.data.data,
      menuData: state.userPermission.menuData,
      userId: state.userPermission.employeeId
    };
  }
);

export const fetchAllUserPermissions = createAsyncThunk(
  "userPermission/fetchAllUserPermissions",
  async () => {
    const response = await api.get(`userpermission/get/-1`);
    return response.data.data;
  }
);

export const updateUserPermission = createAsyncThunk(
  "userPermission/updateUserPermission",
  async ({ userId, permissions }: { userId: string; permissions: any[] }) => {
    const response = await api.put(
      `userpermission/update/${userId}`,
      permissions
    );
    return response.data;
  }
);

export const createUserPermission = createAsyncThunk(
  "userPermission/createUserPermission",
  async ({ userId, permissions }: { userId: string; permissions: any[] }) => {
    const response = await api.post("userpermission/create", {
      permissions: permissions.map((p) => ({
        ...p,
        UserId: String(userId),
      })),
    });
    return response.data;
  }
);

export const deleteUserPermission = createAsyncThunk(
  "userPermission/deleteUserPermission",
  async (userId: string) => {
    const response = await api.delete(`userpermission/delete/${userId}`);
    return response.data;
  }
);

const userPermissionSlice = createSlice({
  name: "userPermission",
  initialState,
  reducers: {
    setEmployeeId: (state, action: PayloadAction<string>) => {
      state.employeeId = action.payload;
    },
    setEnteredEmployeeName: (state, action: PayloadAction<User | null>) => {
      state.enteredEmployeeName = action.payload;
    },
    setSelectedRoleID: (state, action: PayloadAction<string>) => {
      state.selectedRoleID = action.payload;
    },
    setSelectedRoleData: (state, action: PayloadAction<PermissionRow[]>) => {
      state.selectedRoleData = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    handleSelectAll: (state, action: PayloadAction<{ permissionType: PermissionKey; isChecked: boolean }>) => {
      const { permissionType, isChecked } = action.payload;
      state.selectedRoleData = state.selectedRoleData.map(item => ({
        ...item,
        [permissionType]: isChecked
      }));
    },
    handleCheckboxChange: (state, action: PayloadAction<{ menuId: number; permissionType: PermissionKey }>) => {
      const { menuId, permissionType } = action.payload;
      state.selectedRoleData = state.selectedRoleData.map(item =>
        item.menuId === menuId
          ? { ...item, [permissionType]: !item[permissionType] }
          : item
      );
    },
    resetPermissionState: (state) => {
      state.employeeId = "";
      state.enteredEmployeeName = null;
      state.selectedRoleID = "";
      state.selectedRoleData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.menuData = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roleOptions = action.payload;
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action) => {
        const { permissions, menuData, userId } = action.payload;
        if (permissions.length > 0) {
          const permissionData = permissions.map((perm: any) => {
            const menu = menuData.find((m) => m.MenuId === perm.MenuId);
            const parentMenu = menuData.find(
              (m) => m.MenuId === perm.ParentId
            );

            return {
              id: perm.id || `${perm.UserId}-${perm.MenuId}`,
              menuId: perm.MenuId,
              parentId: perm.ParentId,
              menuName: menu?.MenuName || `Menu ${perm.MenuId}`,
              parentMenuName:
                parentMenu?.MenuName ||
                (perm.ParentId === 0 ? "Root" : `Parent ${perm.ParentId}`),
              isAdd: perm.IsAdd || false,
              isEdit: perm.IsEdit || false,
              isDel: perm.IsDel || false,
              isView: perm.IsView || false,
              isPrint: perm.IsPrint || false,
              isExport: perm.IsExport || false,
              isRelease: perm.IsRelease || false,
              isPost: perm.IsPost || false,
              UserId: userId,
            };
          });
          state.selectedRoleData = permissionData;
        } else {
          // If no user permissions found, keep the selectedRoleData empty
          // The component will handle fetching role permissions as fallback
          state.selectedRoleData = [];
        }
      })
      .addCase(fetchRolePermissions.fulfilled, (state, action) => {
        const { roleData, menuData, userId } = action.payload;
        if (roleData && roleData.permissions) {
          const permissionMap = new Map<number, any>();
          roleData.permissions.forEach((perm: any) => {
            permissionMap.set(perm.MenuId, perm);
          });

          const permissionData = menuData.map((menu: Menu) => {
            const permission = permissionMap.get(menu.MenuId) || {
              IsAdd: false,
              IsEdit: false,
              IsDel: false,
              IsView: false,
              IsPrint: false,
              IsExport: false,
              IsRelease: false,
              IsPost: false,
            };

            return {
              id: `${userId}-${menu.MenuId}`,
              menuId: menu.MenuId,
              parentId: menu.ParentId,
              menuName: menu.MenuName,
              parentMenuName:
                menuData.find((m) => m.MenuId === menu.ParentId)?.MenuName ||
                "",
              isAdd: permission.IsAdd,
              isEdit: permission.IsEdit,
              isDel: permission.IsDel,
              isView: permission.IsView,
              isPrint: permission.IsPrint,
              isExport: permission.IsExport,
              isRelease: permission.IsRelease,
              isPost: permission.IsPost,
              UserId: userId || "-1",
            };
          });
          state.selectedRoleData = permissionData;
        } else {
          const defaultPermissionData = menuData.map((menu: Menu) => ({
            id: menu.MenuId.toString(),
            menuId: menu.MenuId,
            parentId: menu.ParentId,
            menuName: menu.MenuName,
            parentMenuName:
              menuData.find((m) => m.MenuId === menu.ParentId)?.MenuName || "",
            isAdd: false,
            isEdit: false,
            isDel: false,
            isView: false,
            isPrint: false,
            isExport: false,
            isRelease: false,
            isPost: false,
            UserId: userId || "-1",
          }));
          state.selectedRoleData = defaultPermissionData;
        }
      })
      .addCase(fetchAllUserPermissions.fulfilled, (state, action) => {
        const permissions = action.payload;
        const seen = new Set();
        let srNo = 1;

        const rows = permissions
          .filter((perm: any) => {
            const key = `${perm.UserId}-${perm.RoleName}`;
            if (!seen.has(key)) {
              seen.add(key);
              return true;
            }
            return false;
          })
          .map((perm: any) => ({
            id: perm.UserId,
            srno: srNo++,
            userName: perm.FullName,
            roleName: perm.RoleName || "N/A",
            FullName: perm.FullName,
          }));

        state.records = rows;
        state.isLoading = false;
      })
      .addCase(updateUserPermission.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createUserPermission.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserPermission.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const {
  setEmployeeId,
  setEnteredEmployeeName,
  setSelectedRoleID,
  setSelectedRoleData,
  setIsLoading,
  handleSelectAll,
  handleCheckboxChange,
  resetPermissionState,
} = userPermissionSlice.actions;

export default userPermissionSlice.reducer;
