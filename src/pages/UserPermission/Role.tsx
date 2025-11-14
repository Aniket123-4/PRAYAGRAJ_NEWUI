import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchRoles,
  fetchRoleDetails,
  saveRole,
  deleteRole,
  clearCurrentRole,
} from "../../redux/slices/roleSlice";
import { fetchMenus } from "../../redux/slices/menuSlice";
import { FiKey, FiX, FiPlus, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import DataGrid from "../../components/common/DataGrid";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";
import { MdCancel } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import Helpdesk from "../../pages/UserPermission/HelpDesk";
import { useTranslation } from "react-i18next";
import { FaSave } from "react-icons/fa";

type PermissionKey =
  | "isAdd"
  | "isEdit"
  | "isDel"
  | "isView"
  | "isPrint"
  | "isExport"
  | "isRelease"
  | "isPost";

interface MenuPermission {
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

const RolePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roles, currentRole, loading } = useAppSelector((state) => state.role);
  const { menus } = useAppSelector((state) => state.menu);

  const [roleName, setRoleName] = useState("");
  const [roleNameError, setRoleNameError] = useState("");
  const [permissions, setPermissions] = useState<MenuPermission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { theme } = useTheme();
  const th = tc(theme);
  const { t } = useTranslation();

  const modalRef = useRef<HTMLDivElement | null>(null);

  // You need to get the actual logged-in user's ID from your auth context
  const currentUserId = "65d8f1a9e4b0c9a8b8c7d6e5"; // Replace with actual user ID from auth context

  /* ---------- effects ---------- */
  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    if (!isModalOpen) return;

    if (currentRole && currentRole.permissions) {
      setRoleName(currentRole.roleName);
      setEditingId(currentRole._id);
      // Wait a bit to ensure menus are loaded before building permissions
      if (menus.length > 0) {
        buildPermissions(currentRole.permissions);
      }
    } else {
      setRoleName("");
      setEditingId(null);
      // Only build empty permissions when menus are available
      if (menus.length > 0) {
        buildPermissions([]);
      }
    }
  }, [currentRole, menus, isModalOpen]);

  // Additional effect to handle when currentRole loads after menus
  useEffect(() => {
    if (isModalOpen && currentRole && currentRole.permissions && menus.length > 0) {
      buildPermissions(currentRole.permissions);
    }
  }, [currentRole, menus, isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  /* ---------- helpers ---------- */
/* ---------- helpers ---------- */
const buildPermissions = (existing: any[] = []) => {
  if (!menus.length) {
    console.log("No menus available to build permissions");
    return;
  }

  console.log("Building permissions with existing:", existing);
  console.log("Available menus:", menus);

  const built = menus.map((m) => {
    // Try to find existing permission for this menu
    const found = existing.find((p) => {
      // Handle both cases: menuId as string or menuId as object with _id
      const permissionMenuId = p.menuId?._id || p.menuId;
      return permissionMenuId === m.MenuId || permissionMenuId?.toString() === m.MenuId;
    });
    
    console.log(`Menu ${m.MenuId} - ${m.MenuName}, found permission:`, found);

    return {
      menuId: m.MenuId,
      parentId: m.ParentId?.toString() || undefined,
      isAdd: found?.isAdd || found?.IsAdd || false,
      isEdit: found?.isEdit || found?.IsEdit || false,
      isDel: found?.isDel || found?.IsDel || false,
      isView: found?.isView || found?.IsView || false,
      isPrint: found?.isPrint || found?.IsPrint || false,
      isExport: found?.isExport || found?.IsExport || false,
      isRelease: found?.isRelease || found?.IsRelease || false,
      isPost: found?.isPost || found?.IsPost || false,
    };
  });
  
  console.log("Built permissions:", built);
  setPermissions(built);
};

  /* ---------- handlers ---------- */
  const openModal = (role?: any) => {
    if (role) {
      console.log("Opening modal for editing role:", role);
      dispatch(fetchRoleDetails(role._id || role.id));
    } else {
      console.log("Opening modal for new role");
      dispatch(clearCurrentRole());
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRoleName("");
    setRoleNameError("");
    setPermissions([]);
    dispatch(clearCurrentRole());
  };

  const handleSelectAll = (key: PermissionKey) => {
    const current = permissions[0]?.[key] || false;
    setPermissions((prev) => prev.map((p) => ({ ...p, [key]: !current })));
  };

  const handleToggle = (menuId: string, key: PermissionKey) => {
    setPermissions((prev) =>
      prev.map((p) => (p.menuId === menuId ? { ...p, [key]: !p[key] } : p))
    );
  };

  const validate = () => {
    if (!roleName.trim()) {
      setRoleNameError(t("text.required", { key: t("text.role") }));
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      id: editingId || undefined,
      roleName,
      permissions: permissions,
      userId: currentUserId,
    };

    try {
      await dispatch(saveRole(payload)).unwrap();
      toast.success(
        editingId 
          ? t("text.updateToast", { key: t("text.role") })
          : t("text.createToast", { key: t("text.role") })
      );
      closeModal();
      dispatch(fetchRoles());
    } catch (e: any) {
      toast.error(e?.message || t("text.oprationFailed"));
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await dispatch(deleteRole(deleteId)).unwrap();
      toast.success(t("text.deleteToast", { key: t("text.role") }));
      setDeleteId(null);
      dispatch(fetchRoles());
    } catch (e: any) {
      toast.error(
        e?.message || t("text.deleteAError", { key: t("text.role") })
      );
    }
  };

  // Prepare data for DataGrid with proper ID mapping
  const gridData = roles.map((role: any) => ({
    ...role,
    id: role._id,
    RoleName: role.roleName,
  }));

  /* ---------- render ---------- */
  return (
    <div
      className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 px-1">
        <div>
          <h1
            className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${th.text}`}
          >
            <FaUserCog className="text-indigo-600 w-6 h-6" />{" "}
            {t("text.roleManagement")}
          </h1>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="w-1/2 sm:w-auto">
            <Helpdesk menuId={25} />
          </div>
          <div className="w-1/2 sm:w-auto">
            <Button
              icon={<FiPlus />}
              text={t("text.add")}
              onClick={() => openModal()}
              bgColor={`${th.button.primary}`}
              className="w-full sm:w-auto"
              disabled={loading}
            />
          </div>
        </div>
      </div>
      
      <DataGrid
        columns={[{ key: "RoleName", header: t("text.roleName") }]}
        data={gridData}
        actions={[
          { label: "Edit", onClick: (row) => openModal(row) },
          { label: "Delete", onClick: (row: any) => setDeleteId(row.id) },
        ]}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className={`${th.modal} rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto`}
          >
            <div
              className={`flex justify-between items-center p-4 border-b ${th.border}`}
            >
              <h2
                className={`text-xl font-semibold flex items-center gap-2 ${th.text}`}
              >
                <FiKey className="text-indigo-600" />
                {editingId ? t("text.editRole") : t("text.addRole")}
              </h2>
              <button
                onClick={closeModal}
                className={`${th.subText} hover:${th.text}`}
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4">
              <TextField
                label={t("text.roleName")}
                value={roleName}
                onChange={(e) => {
                  setRoleName(e.target.value);
                  if (e.target.value.trim()) setRoleNameError("");
                }}
                error={roleNameError}
                className="mb-4"
                placeholder={t("text.enterRoleName")}
              />

              <div className="mb-4">
                <h3 className={`text-lg font-medium mb-2 ${th.text}`}>
                  {t("text.permissions")}
                </h3>
                {loading && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-2">Loading permissions...</p>
                  </div>
                )}
                {!loading && (
                  <div className="overflow-auto">
                    <table className={`min-w-full border ${th.border}`}>
                      <thead>
                        <tr>
                          <th
                            className={`px-4 py-2 text-left border ${th.border}`}
                          >
                            {t("text.menuName")}
                          </th>
                          {(
                            [
                              "Add",
                              "Edit",
                              "Del",
                              "View",
                              "Print",
                              "Export",
                              "Release",
                              "Post",
                            ] as const
                          ).map((perm) => {
                            const key = `is${perm}` as PermissionKey;
                            const all =
                              permissions.length > 0 &&
                              permissions.every((p) => p[key]);
                            return (
                              <th
                                key={perm}
                                className={`px-2 py-2 border text-center ${th.border}`}
                              >
                                <div className="flex flex-col items-center">
                                  <span>{perm}</span>
                                  <input
                                    type="checkbox"
                                    checked={all}
                                    onChange={() => handleSelectAll(key)}
                                    disabled={permissions.length === 0}
                                  />
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {menus.map((menu) => {
                          const perm = permissions.find(
                            (p) => p.menuId === menu.MenuId
                          );
                          if (!perm) return null;
                          return (
                            <tr key={menu.MenuId} className={th.tableRow}>
                              <td className={`px-4 py-2 border ${th.border}`}>
                                {menu.MenuName}
                              </td>
                              {(
                                [
                                  "Add",
                                  "Edit",
                                  "Del",
                                  "View",
                                  "Print",
                                  "Export",
                                  "Release",
                                  "Post",
                                ] as const
                              ).map((p) => {
                                const key = `is${p}` as PermissionKey;
                                return (
                                  <td
                                    key={p}
                                    className={`px-2 py-2 border text-center ${th.border}`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={perm[key]}
                                      onChange={() =>
                                        handleToggle(menu.MenuId, key)
                                      }
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  icon={<MdCancel />}
                  text={t("text.cancel")}
                  onClick={closeModal}
                  bgColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
                  disabled={loading}
                />
                <Button
                  icon={editingId ? <FiEdit /> : <FaSave />}
                  text={editingId ? t("text.update") : t("text.save")}
                  onClick={handleSubmit}
                  bgColor={`${th.button.primary}`}
                  disabled={loading || permissions.length === 0}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <ConfirmationModal
          title={t("text.confirmDeleteText")}
          message={t("text.confirmDelete")}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          confirmColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
        />
      )}
    </div>
  );
};

export default RolePage;