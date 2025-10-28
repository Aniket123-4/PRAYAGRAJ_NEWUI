import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUser, FiX, FiEdit, FiPlus } from "react-icons/fi";
import Select from "react-select";
import { PermissionKey } from "../../types/userPermissionTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import Helpdesk from "../../pages/UserPermission/HelpDesk";

import {
  fetchMenuData,
  fetchUsers,
  fetchRoles,
  fetchUserPermissions,
  fetchRolePermissions,
  fetchAllUserPermissions,
  updateUserPermission,
  createUserPermission,
  deleteUserPermission,
  setEmployeeId,
  setEnteredEmployeeName,
  setSelectedRoleID,
  setSelectedRoleData,
  setIsLoading,
  handleSelectAll,
  handleCheckboxChange,
  resetPermissionState,
} from "../../redux/slices/userPermissionSlice";
import Button from "../../components/common/Button";
import DataGrid from "../../components/common/DataGrid";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";
import { usePermissionByMenuName } from "../../hooks/usePermission";
import { MdCancel } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { FaSave } from "react-icons/fa";

export default function UserPermission() {
  const dispatch = useAppDispatch();
  const {
    menuData,
    users,
    employeeId,
    enteredEmployeeName,
    selectedRoleData,
    isLoading,
    records,
  } = useAppSelector((state) => state.userPermission);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState<string | null>(
    null
  );
  const [hasUserPermissions, setHasUserPermissions] = useState(false);

  const { theme } = useTheme();
  const th = tc(theme);
  const permission = usePermissionByMenuName("User Permission");
  const { t } = useTranslation();

  /* ---------- dark mode styles for react-select ---------- */
  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: 36,
      fontSize: "0.875rem",
      backgroundColor: theme === "dark" ? "#374151" : base.backgroundColor,
      borderColor: theme === "dark" ? "#4b5563" : base.borderColor,
      color: theme === "dark" ? "#f9fafb" : base.color,
      boxShadow: state.isFocused
        ? theme === "dark"
          ? "0 0 0 1px #6366f1"
          : "0 0 0 1px #6366f1"
        : base.boxShadow,
      "&:hover": {
        borderColor: theme === "dark" ? "#6366f1" : base.borderColor,
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#374151" : base.backgroundColor,
    }),
    option: (base: any, state: any) => ({
      ...base,
      fontSize: "0.875rem",
      backgroundColor: state.isSelected
        ? theme === "dark"
          ? "#4f46e5"
          : "#e0e7ff"
        : state.isFocused
        ? theme === "dark"
          ? "#525252"
          : "#f3f4f6"
        : base.backgroundColor,
      color: theme === "dark" ? "#f9fafb" : base.color,
      padding: "4px 8px",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#f9fafb" : base.color,
    }),
    placeholder: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#9ca3af" : base.color,
    }),
  };

  /* ---------- handlers ---------- */
  const handleUserChange = async (selectedUser: any | null) => {
    dispatch(setEnteredEmployeeName(selectedUser));
    if (selectedUser) {
      dispatch(setEmployeeId(selectedUser.USER_ID));
      dispatch(setSelectedRoleID(selectedUser.RANK_ID));
      try {
        dispatch(setIsLoading(true));
        const userPermissionsResult: any = await dispatch(
          fetchUserPermissions(selectedUser.USER_ID)
        );
        if (userPermissionsResult.payload?.permissions?.length > 0) {
          setHasUserPermissions(true);
        } else {
          const rolePermissionsResult: any = await dispatch(
            fetchRolePermissions(selectedUser.RANK_ID)
          );
          setHasUserPermissions(
            rolePermissionsResult.payload?.roleData?.permissions?.length > 0
          );
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
        toast.error("Failed to load permissions");
      } finally {
        dispatch(setIsLoading(false));
      }
    } else {
      dispatch(resetPermissionState());
      setHasUserPermissions(false);
    }
  };

  const handleModalClose = () => {
    dispatch(resetPermissionState());
    setHasUserPermissions(false);
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    dispatch(resetPermissionState());
    setHasUserPermissions(false);
    setIsModalOpen(true);
    if (menuData.length > 0) {
      const defaultPermissionData = menuData.map((menu: any) => ({
        id: menu.MenuId.toString(),
        menuId: menu.MenuId,
        parentId: menu.ParentId,
        menuName: menu.MenuName,
        parentMenuName:
          menuData.find((m: any) => m.MenuId === menu.ParentId)?.MenuName || "",
        isAdd: false,
        isEdit: false,
        isDel: false,
        isView: false,
        isPrint: false,
        isExport: false,
        isRelease: false,
        isPost: false,
        UserId: "-1",
      }));
      dispatch(setSelectedRoleData(defaultPermissionData));
    }
  };

  const handleSelectAllPermissions = (
    permissionType: PermissionKey,
    isChecked: boolean
  ) => {
    dispatch(handleSelectAll({ permissionType, isChecked }));
  };

  const handleCheckboxPermissionChange = (
    menuId: number,
    permissionType: PermissionKey
  ) => {
    dispatch(handleCheckboxChange({ menuId, permissionType }));
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    if (!employeeId) {
      toast.error(t("text.pleaseSelectAnEmployee"));
      return;
    }
    try {
      const payload = selectedRoleData.map((perm) => ({
        MenuId: perm.menuId,
        ParentId: perm.parentId,
        IsAdd: perm.isAdd,
        IsEdit: perm.isEdit,
        IsDel: perm.isDel,
        IsView: perm.isView,
        IsPrint: perm.isPrint,
        IsExport: perm.isExport,
        IsRelease: perm.isRelease,
        IsPost: perm.isPost,
      }));
      if (hasUserPermissions) {
        await dispatch(
          updateUserPermission({ userId: employeeId, permissions: payload })
        ).unwrap();
        toast.success(t("text.updateToast", { key: t("text.permissions") }));
      } else {
        await dispatch(
          createUserPermission({ userId: employeeId, permissions: payload })
        ).unwrap();
        toast.success(t("text.createToast", { key: t("text.permissions") }));
      }
      handleModalClose();
      await dispatch(fetchAllUserPermissions());
    } catch (error: any) {
      toast.error(
        error.message ||
          t("text.saveErrorToast", { key: t("text.permissions") })
      );
    }
  };

  const handleDeleteConfirm = async () => {
    if (!permissionToDelete) return;
    try {
      dispatch(setIsLoading(true));
      await dispatch(deleteUserPermission(permissionToDelete)).unwrap();
      toast.success(t("text.deleteToast", { key: t("text.permissions") }));
      await dispatch(fetchAllUserPermissions());
    } catch (error: any) {
      toast.error(
        error.message || t("text.deleteAError", { key: t("text.permissions") })
      );
    } finally {
      dispatch(setIsLoading(false));
      setPermissionToDelete(null);
    }
  };

  const handleEditClick = async (row: any) => {
    const mockUser = {
      USER_ID: row.id,
      FIRST_NAME: row.userName || row.FullName,
      MIDDLE_NAME: "",
      SUR_NAME: "",
      RANK_ID: "",
    };
    dispatch(setEnteredEmployeeName(mockUser));
    dispatch(setEmployeeId(row.id));
    try {
      dispatch(setIsLoading(true));
      const userPermissionsResult: any = await dispatch(
        fetchUserPermissions(row.id)
      );
      setHasUserPermissions(
        userPermissionsResult.payload?.permissions?.length > 0
      );
      setIsModalOpen(true);
    } catch (error) {
      toast.error(t("text.failedToLoadPermissions"));
      setIsModalOpen(true);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  /* ---------- effects ---------- */
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([
          dispatch(fetchMenuData()),
          dispatch(fetchUsers()),
          dispatch(fetchRoles()),
          dispatch(fetchAllUserPermissions()),
        ]);
      } catch (error) {
        toast.error(t("text.failedToLoadInitialData"));
      }
    };
    loadInitialData();
  }, [dispatch]);

  /* ---------- render ---------- */
  return (
    <div
      className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 px-1">
        <div>
          {/* <h1
            className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${th.text}`}
          >
            <AiOutlineSafetyCertificate className="text-indigo-600 w-6 h-6" />
            {t("text.userPermissionManagement")}
          </h1> */}
          <h1
            className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${th.text}`}
          >
            <AiOutlineSafetyCertificate className="text-indigo-600 w-6 h-6" />
            <span className="block sm:hidden">
              {t("text.userPermissionMgmt")}
            </span>
            <span className="hidden sm:block">
              {t("text.userPermissionManagement")}
            </span>
          </h1>
        </div>
        {/* <div className="flex items-center gap-2 sm:w-auto">
          <div className="w-1/2 sm:w-auto">
            <Helpdesk menuId={29} />
          </div>
          <div className="w-1/3 sm:w-auto">
            <Button
              icon={<FiPlus />}
              text={t("text.add")}
              onClick={handleModalOpen}
              bgColor={theme === "dark" ? "bg-blue-700" : "bg-blue-900"}
              className="w-full sm:w-auto"
            />
          </div>
        </div> */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
          <div className="w-1/2 sm:w-auto">
            <Helpdesk menuId={29} />
          </div>
          <div className="w-1/2 sm:w-auto flex justify-end">
            <Button
              icon={<FiPlus />}
              text={t("text.add")}
              onClick={handleModalOpen}
              bgColor={theme === "dark" ? "bg-blue-700" : "bg-blue-900"}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>

      <DataGrid
        columns={[
          { key: "userName", header: t("text.userName") },
          { key: "roleName", header: t("text.roleName") },
        ]}
        data={records}
        actions={[
          ...(permission?.isEdit
            ? [{ label: "Edit", onClick: handleEditClick }]
            : []),
          ...(permission?.isDel
            ? [
                {
                  label: "Delete",
                  onClick: (row: any) => setPermissionToDelete(row.id),
                },
              ]
            : []),
        ]}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            className={`${th.modal} rounded-xl shadow-lg w-full max-w-4xl max-h-[95vh]`}
          >
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <>
                <div
                  className={`flex justify-between items-center p-4 border-b ${th.border}`}
                >
                  <h2
                    className={`text-xl font-semibold flex items-center gap-2 ${th.text}`}
                  >
                    <FiUser className="text-indigo-600" />
                    {hasUserPermissions
                      ? t("text.editUserPermission")
                      : t("text.addUserPermission")}
                  </h2>
                  <button
                    onClick={handleModalClose}
                    className={`${th.subText} hover:${th.text}`}
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                  <div className="mb-4">
                    <label
                      className={`block text-sm font-medium mb-1 ${th.text}`}
                    >
                      {t("text.selectEmployee")}
                    </label>
                    <Select
                      options={users.map((user: any) => ({
                        value: user,
                        label: `${user.FIRST_NAME || ""} ${
                          user.MIDDLE_NAME || ""
                        } ${user.SUR_NAME || ""}`.trim(),
                      }))}
                      value={
                        enteredEmployeeName
                          ? {
                              value: enteredEmployeeName,
                              label: `${enteredEmployeeName.FIRST_NAME || ""} ${
                                enteredEmployeeName.MIDDLE_NAME || ""
                              } ${enteredEmployeeName.SUR_NAME || ""}`.trim(),
                            }
                          : null
                      }
                      onChange={(selectedOption: any) =>
                        handleUserChange(selectedOption?.value)
                      }
                      placeholder={t("text.selectEmployee")}
                      classNamePrefix="react-select"
                      styles={selectStyles}
                    />
                  </div>

                  <div className="mb-4 max-h-[50vh] overflow-y-auto">
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
                            {[
                              "Add",
                              "Edit",
                              "Del",
                              "View",
                              "Print",
                              "Export",
                              "Release",
                              "Post",
                            ].map((perm) => (
                              <th
                                key={perm}
                                className={`px-2 py-2 border text-center ${th.border}`}
                              >
                                <div className="flex flex-col items-center">
                                  <span>{perm}</span>
                                  <input
                                    type="checkbox"
                                    checked={selectedRoleData.every(
                                      (row) => row[`is${perm}` as PermissionKey]
                                    )}
                                    onChange={(e) =>
                                      handleSelectAllPermissions(
                                        `is${perm}` as PermissionKey,
                                        e.target.checked
                                      )
                                    }
                                  />
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {selectedRoleData.map((row) => (
                            <tr key={row.menuId} className={th.tableRow}>
                              <td className={`px-4 py-2 border ${th.border}`}>
                                {row.menuName}
                              </td>
                              {[
                                "Add",
                                "Edit",
                                "Del",
                                "View",
                                "Print",
                                "Export",
                                "Release",
                                "Post",
                              ].map((perm) => {
                                const field = `is${perm}` as PermissionKey;
                                return (
                                  <td
                                    key={perm}
                                    className={`px-2 py-2 border text-center ${th.border}`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={row[field]}
                                      onChange={() =>
                                        handleCheckboxPermissionChange(
                                          row.menuId,
                                          field
                                        )
                                      }
                                    />
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      icon={<MdCancel />}
                      text={t("text.cancel")}
                      onClick={handleModalClose}
                      bgColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
                    />
                    <Button
                      icon={hasUserPermissions ? <FiEdit /> : <FaSave />}
                      text={
                        hasUserPermissions ? t("text.update") : t("text.save")
                      }
                      onClick={handleSubmit}
                      bgColor={`${th.button.primary}`}
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {permissionToDelete !== null && (
        <ConfirmationModal
          title={t("text.confirmDeleteText")}
          message={t("text.confirmDelete")}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPermissionToDelete(null)}
          confirmColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
        />
      )}
    </div>
  );
}
