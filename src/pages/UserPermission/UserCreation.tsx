import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers, deleteUser } from "../../redux/slices/userSlice";
import DataGrid from "../../components/common/DataGrid";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";
import { usePermissionByMenuName } from "../../hooks/usePermission";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { toast } from "react-toastify";
import { FaUserPlus } from "react-icons/fa6";
import Helpdesk from "../../pages/UserPermission/HelpDesk";
import { FiPlus } from "react-icons/fi";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";

const UserCreation: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading } = useAppSelector((state) => state.user);
  const permission = usePermissionByMenuName("User Creation");
  const { theme } = useTheme();
  const th = tc(theme);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAdd = () => {
    navigate("/usermanagement/usercreation/add");
  };

  const handleEdit = (row: any) => {
    navigate(`/usermanagement/usercreation/edit/${row.USER_ID}`);
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await dispatch(deleteUser(deleteId)).unwrap();
        toast.success(t("text.deleteToast", { key: t("text.user") }));
        setDeleteId(null);
        dispatch(fetchUsers());
      } catch (error) {
        toast.error(t("text.deleteAError", { key: t("text.user") }));
      }
    }
  };

  return (
    <div
      className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 px-1">
        <div>
          <h1
            className={`text-2xl font-bold mb-4 flex items-center gap-2 ${th.text}`}
          >
            <FaUserPlus className="text-indigo-600 w-6 h-6" />{" "}
            {t("text.userManagement")}
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:w-auto">
          <div className="w-1/2 sm:w-auto">
            <Helpdesk menuId={30} />
          </div>
          <div className="w-1/2 sm:w-auto">
            <Button
              icon={<FiPlus />}
              text={t("text.add")}
              onClick={handleAdd}
              bgColor={`${th.button.primary}`}
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
      <DataGrid
        columns={[
          { key: "LOGIN_NAME", header: t("text.loginName") },
          { key: "FIRST_NAME", header: t("text.firstName") },
          { key: "EMAIL", header: t("text.email") },
          { key: "CUR_MOBILE", header: t("text.contactNo") },
          { key: "RoleName", header: t("text.role") },
          { key: "Source", header: t("text.source") },
        ]}
        data={users}
        // @ts-ignore
        loading={loading}
        // actions={[
        //   ...(permission?.isEdit
        //     ? [{ label: "Edit", onClick: handleEdit }]
        //     : []),
        //   ...(permission?.isDel
        //     ? [
        //         {
        //           label: "Delete",
        //           onClick: (row: any) => setDeleteId(row.USER_ID),
        //         },
        //       ]
        //     : []),
        // ]}
        actions={[
          ...(permission?.isEdit
            ? [
                {
                  label: "edit",
                  onClick: (row: any) => {
                    if (row.Source !== "Public") {
                      handleEdit(row);
                    }
                  },
                },
              ]
            : []),
          ...(permission?.isDel
            ? [
                {
                  label: "delete",
                  onClick: (row: any) => {
                    if (row.Source !== "Public") {
                      setDeleteId(row.USER_ID);
                    }
                  },
                },
              ]
            : []),
        ]}
      />

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

export default UserCreation;
