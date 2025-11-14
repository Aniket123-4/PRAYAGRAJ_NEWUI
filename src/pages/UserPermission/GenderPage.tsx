import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  saveOrUpdateGender,
  deleteGender,
  fetchGenders,
} from "../../redux/slices/genderSlice";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import DataGrid from "../../components/common/DataGrid";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { toast } from "react-toastify";
import { IoMdRefresh } from "react-icons/io";
import { FaEdit, FaSave } from "react-icons/fa";
import { usePermissionByMenuName } from "../../hooks/usePermission";
import Helpdesk from "../../pages/UserPermission/HelpDesk";
import { HiUserGroup } from "react-icons/hi";
import { useTranslation } from "react-i18next";

interface GenderForm {
  id?: string; // Changed to string for MongoDB _id
  name: string;
}

const GenderPage: React.FC = () => {
  const defaultForm: GenderForm = { name: "" };

  const dispatch = useAppDispatch();
  const { Genders, loading } = useAppSelector((state: any) => state.gender);
  const permission = usePermissionByMenuName("Gender");

  const [form, setForm] = useState<GenderForm>(defaultForm);
  const [originalData, setOriginalData] = useState<GenderForm | null>(null);
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [editingId, setEditingId] = useState<string | null>(null); // Changed to string
  const [deleteId, setDeleteId] = useState<string | null>(null); // Changed to string
  const { theme } = useTheme();
  const th = tc(theme);
  const { t } = useTranslation();

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchGenders());
  }, [dispatch]);

  const handleInputChange = (
    field: keyof GenderForm,
    value: string | number
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name)
      newErrors.name = t("text.requiredName", {
        key: t("text.gender"),
      });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      if (editingId) {
        await dispatch(
          saveOrUpdateGender({ id: editingId, name: form.name })
        ).unwrap();
        toast.success(
          t("text.updateToast", {
            key: t("text.gender"),
          })
        );
      } else {
        await dispatch(saveOrUpdateGender({ name: form.name })).unwrap();
        toast.success(
          t("text.createToast", {
            key: t("text.gender"),
          })
        );
      }
      resetForm(true);
      //@ts-ignore
      dispatch(fetchGenders());
    } catch {
      toast.error(t("text.saveErrorToast", { key: t("text.gender") }));
    }
  };

  const handleEdit = (gender: any) => {
    // Use _id from MongoDB response
    const genderId = gender._id || gender.id;
    const data = { name: gender.name };
    setForm(data);
    setOriginalData(data);
    setEditingId(genderId);
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await dispatch(deleteGender(deleteId)).unwrap();
        toast.success(
          t("text.deleteToast", {
            key: t("text.gender"),
          })
        );
        setDeleteId(null);
        //@ts-ignore
        dispatch(fetchGenders());
      } catch {
        toast.error(
          t("text.deleteErrorToast", {
            key: t("text.gender"),
          })
        );
      }
    }
  };

  const resetForm = (clear = false) => {
    if (!clear && editingId && originalData) {
      setForm(originalData);
    } else {
      setForm(defaultForm);
      setEditingId(null);
      setOriginalData(null);
    }
  };

  // Prepare data for DataGrid - ensure we have proper id field
  const gridData = Genders.map((gender: any) => ({
    ...gender,
    id: gender._id || gender.id, // Use _id as primary identifier
  }));

  return (
    <div
      className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 px-1">
        <div>
          <h1 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${th.text}`}>
            <HiUserGroup className="text-indigo-600 w-6 h-6" />{" "}
            {t("text.management", {
              key: t("text.gender"),
            })}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Helpdesk menuId={17} />
        </div>
      </div>
      {/* {(permission?.isAdd || editingId !== null) && ( */}
      <div
        className={`rounded-xl shadow-md p-4 mb-6 transition-colors ${th.card}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField
            label={t("text.genderName")}
            value={form.name}
            placeholder={t("text.enterName", {
              key: t("text.gender"),
            })}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={errors.name}
            required
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
            text={t("text.reset")}
            onClick={() => resetForm()}
            bgColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
            icon={<IoMdRefresh />}
            disabled={loading}
            className="w-1/2 sm:w-auto"
          />
        </div>
      </div>
      {/* )} */}

      <DataGrid
        columns={[{ key: "name", header: t("text.gender") }]}
        data={gridData}
        actions={[

          { label: "Edit", onClick: handleEdit },


          { label: "Delete", onClick: (row: any) => setDeleteId(row.id) }// Use row.id which now contains _id

        ]}
      />

      {deleteId !== null && (
        <ConfirmationModal
          title={t("text.confirmDeleteText")}
          message={t("text.confirmationMessage", {
            key: t("text.gender"),
          })}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          confirmColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
        />
      )}
    </div>
  );
};

export default GenderPage;