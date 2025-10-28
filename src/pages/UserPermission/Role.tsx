import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchRoles,
  fetchRoleDetails,
  createRole,
  updateRole,
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
  | "IsAdd"
  | "IsEdit"
  | "IsDel"
  | "IsView"
  | "IsPrint"
  | "IsExport"
  | "IsRelease"
  | "IsPost";

interface MenuPermission {
  menuId: number;
  parentId: number;
  IsAdd: boolean;
  IsEdit: boolean;
  IsDel: boolean;
  IsView: boolean;
  IsPrint: boolean;
  IsExport: boolean;
  IsRelease: boolean;
  IsPost: boolean;
}

const RolePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roles, currentRole } = useAppSelector((state) => state.role);
  const { menus } = useAppSelector((state) => state.menu);

  const [roleName, setRoleName] = useState("");
  const [roleNameError, setRoleNameError] = useState("");
  const [permissions, setPermissions] = useState<MenuPermission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { theme } = useTheme();
  const th = tc(theme);
  const { t } = useTranslation();

  const modalRef = useRef<HTMLDivElement | null>(null);

  /* ---------- effects ---------- */
  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    if (!isModalOpen) return;

    if (currentRole) {
      setRoleName(currentRole.RoleName);
      setEditingId(currentRole.RoleID);
      buildPermissions(currentRole.permissions || []);
    } else {
      setRoleName("");
      setEditingId(null);
      buildPermissions([]);
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
  const buildPermissions = (existing: any[] = []) => {
    if (!menus.length) return;

    const built = menus.map((m) => {
      const found = existing.find((p) => p.MenuId === m.MenuId);
      return {
        menuId: m.MenuId,
        parentId: m.ParentId || 0,
        IsAdd: found?.IsAdd || false,
        IsEdit: found?.IsEdit || false,
        IsDel: found?.IsDel || false,
        IsView: found?.IsView || false,
        IsPrint: found?.IsPrint || false,
        IsExport: found?.IsExport || false,
        IsRelease: found?.IsRelease || false,
        IsPost: found?.IsPost || false,
      };
    });
    setPermissions(built);
  };

  /* ---------- handlers ---------- */
  const openModal = (role?: any) => {
    if (role) {
      dispatch(fetchRoleDetails(role.RoleID));
    } else {
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

  const handleToggle = (menuId: number, key: PermissionKey) => {
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
      roleName,
      rolePermission: permissions.map((p) => ({
        menuId: p.menuId,
        parentId: p.parentId,
        isAdd: p.IsAdd,
        isEdit: p.IsEdit,
        isDel: p.IsDel,
        isView: p.IsView,
        isPrint: p.IsPrint,
        isExport: p.IsExport,
        isRelease: p.IsRelease,
        isPost: p.IsPost,
      })),
      user_ID: "20",
      createdDt: new Date().toISOString(),
      modifyDt: new Date().toISOString(),
    };

    try {
      if (editingId) {
        await dispatch(updateRole({ ...payload, roleId: editingId })).unwrap();
        toast.success(t("text.updateToast", { key: t("text.role") }));
      } else {
        await dispatch(createRole(payload)).unwrap();
        toast.success(t("text.createToast", { key: t("text.role") }));
      }
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
        {/* <div className="flex items-center gap-2">
          <div className="mr-4 mt-1">
            <Helpdesk menuId={25} />
          </div>
          <div className="mr-4">
            <Button
              icon={<FiPlus />}
              text={t("text.add")}
              onClick={() => openModal()}
              bgColor={theme === "dark" ? "bg-blue-700" : "bg-blue-900"}
            />
          </div>
        </div> */}
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
            />
          </div>
        </div>
      </div>
      <DataGrid
        // @ts-ignore
        columns={[{ key: "RoleName", header: t("text.roleName") }]}
        // @ts-ignore
        data={roles}
        actions={[
          { label: "Edit", onClick: (row) => openModal(row) },
          { label: "Delete", onClick: (row: any) => setDeleteId(row.RoleID) },
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
                          const key = `Is${perm}` as PermissionKey;
                          const all =
                            permissions.length &&
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
                                  //@ts-ignore
                                  checked={all}
                                  onChange={() => handleSelectAll(key)}
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
                              const key = `Is${p}` as PermissionKey;
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
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  icon={<MdCancel />}
                  text={t("text.cancel")}
                  onClick={closeModal}
                  bgColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
                />
                <Button
                  icon={editingId ? <FiEdit /> : <FaSave />}
                  text={editingId ? t("text.update") : t("text.save")}
                  onClick={handleSubmit}
                  bgColor={`${th.button.primary}`}
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
