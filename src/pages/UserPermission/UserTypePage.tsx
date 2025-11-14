// src/pages/UserTypePage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchUserTypes,
  saveOrUpdateUserType,
  deleteUserType,
} from "../../redux/slices/userTypeSlice";
import { MdManageAccounts } from "react-icons/md";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import DataGrid from "../../components/common/DataGrid";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { toast } from "react-toastify";
import { IoMdRefresh } from "react-icons/io";
import { FaEdit, FaSave } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";
import { usePermissionByMenuName } from "../../hooks/usePermission";
import { useTranslation } from "react-i18next";
import Helpdesk from "../../pages/UserPermission/HelpDesk";

interface UserTypeForm {
  id?: string;
  userTypeName: string;
  userTypeCode: string;
}

const UserTypePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { usertypes, loading } = useAppSelector((state) => state.usertype);
  const permission = usePermissionByMenuName("User Type");

  const defaultData: UserTypeForm = {
    userTypeName: "",
    userTypeCode: "",
  };
  const [form, setForm] = useState<UserTypeForm>(defaultData);
  const [errors, setErrors] = useState<{ userTypeName?: string; userTypeCode?: string }>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<UserTypeForm | null>(null);

  const { theme } = useTheme();
  const th = tc(theme);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchUserTypes());
  }, [dispatch]);

  const handleInputChange = (field: keyof UserTypeForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.userTypeName)
      newErrors.userTypeName = t("text.requiredName", { key: t("text.userType") });
    if (!form.userTypeCode)
      newErrors.userTypeCode = t("text.requiredCode", { key: t("text.userType") });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (editingId) {
        await dispatch(
          saveOrUpdateUserType({ 
            id: editingId, 
            userTypeName: form.userTypeName, 
            userTypeCode: form.userTypeCode 
          })
        ).unwrap();
        toast.success(
          t("text.updateToast", {
            key: t("text.userType"),
          })
        );
      } else {
        await dispatch(
          saveOrUpdateUserType({ 
            userTypeName: form.userTypeName, 
            userTypeCode: form.userTypeCode 
          })
        ).unwrap();
        toast.success(
          t("text.createToast", {
            key: t("text.userType"),
          })
        );
      }
      handleReset(true);
      dispatch(fetchUserTypes());
    } catch (error) {
      toast.error(t("text.saveErrorToast", { key: t("text.userType") }));
    }
  };

  const handleEdit = (usertype: any) => {
    const currentData = {
      userTypeName: usertype.userTypeName,
      userTypeCode: usertype.userTypeCode,
    };
    setForm(currentData);
    setOriginalData(currentData);
    setEditingId(usertype._id);
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await dispatch(deleteUserType(deleteId)).unwrap();
      toast.success(
        t("text.deleteToast", {
          key: t("text.userType"),
        })
      );
      setDeleteId(null);
      dispatch(fetchUserTypes());
    } catch (error) {
      toast.error(
        t("text.deleteErrorToast", {
          key: t("text.userType"),
        })
      );
    }
  };

  const handleReset = (clear = false) => {
    if (!clear && editingId && originalData) {
      setForm(originalData);
    } else {
      setForm(defaultData);
      setEditingId(null);
      setOriginalData(null);
    }
  };

  // Prepare data for DataGrid with proper ID mapping
  const gridData = usertypes.map((usertype: any) => ({
    ...usertype,
    id: usertype._id, // Map _id to id for DataGrid
  }));

  return (
    <div
      className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 px-1">      
        <div>
        <h1 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${th.text}`}>
        <MdManageAccounts  className="w-6 h-6 text-indigo-600" />
          <span className="block xxs:hidden">{t("text.usertypemgmt")}</span>
          <span className="hidden xxs:block">
            {t("text.usertypemanagement")}
          </span>
        </h1>
        </div>
        <div className="flex items-center gap-2">
          <Helpdesk menuId={21} />
        </div>
      </div>


        <div
          className={`rounded-xl shadow-md p-4 mb-6 transition-colors ${th.card}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label={t("text.name", { key: t("text.userType") })}
              value={form.userTypeName}
              onChange={(e) => handleInputChange("userTypeName", e.target.value)}
              error={errors.userTypeName}
              placeholder={t("text.enterName", { key: t("text.userType") })}
            />
            <TextField
              label={t("text.userTypeCode")}
              value={form.userTypeCode}
              onChange={(e) => handleInputChange("userTypeCode", e.target.value)}
              error={errors.userTypeCode}
              placeholder={t("text.enterCode", { key: t("text.userType") })}
            />
          </div>

          <div className="mt-4 flex flex-row sm:flex-row gap-4 w-full">
            <Button
              icon={editingId ? <FaEdit /> : <FaSave />}
              text={editingId ? t("text.update") : t("text.save")}
              onClick={handleSubmit}
              bgColor={`${th.button.primary}`}
              disabled={loading}
              className="w-1/2 sm:w-auto"
            />
            <Button
              icon={<IoMdRefresh />}
              text={t("text.reset")}
              onClick={() => handleReset()}
              bgColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
              disabled={loading}
              className="w-1/2 sm:w-auto"
            />
          </div>
        </div>


      <DataGrid
        columns={[
          {
            key: "userTypeName",
            header: t("text.name", { key: t("text.userType") }),
          },
          {
            key: "userTypeCode",
            header: t("text.code", { key: t("text.userType") }),
          },
        ]}
        data={gridData}
        actions={[
        { label: "Edit", onClick: handleEdit },
          
                {
                  label: "Delete",
                  onClick: (row: any) => setDeleteId(row.id),
                }
         
        ]}
      />

      {deleteId !== null && (
        <ConfirmationModal
          title={t("text.confirmDeleteText")}
          message={t("text.confirmationMessage", {
            key: t("text.userType"),
          })}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          confirmColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
        />
      )}
    </div>
  );
};

export default UserTypePage;