import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchMenus,
  saveMenu,
  deleteMenu,
} from "../../redux/slices/menuSlice";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import DataGrid from "../../components/common/DataGrid";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import AutoCompleteSelect, {
  Option,
} from "../../components/common/AutoCompleteSelect";
import { toast } from "react-toastify";
import { ListChecks } from "lucide-react";
import { IoMdRefresh } from "react-icons/io";
import { FaEdit, FaSave } from "react-icons/fa";
import { usePermissionByMenuName } from "../../hooks/usePermission";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";
import { useTranslation } from "react-i18next";
import Helpdesk from "../../pages/UserPermission/HelpDesk";

interface MenuForm {
  id?: string;
  menuName: string;
  parentId: string | null;
  pageUrl: string;
  icon: string;
  displayOrder: number;
}

const MenuPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { menus, loading } = useAppSelector((state) => state.menu);
  const permission = usePermissionByMenuName("Menu Master");

  const defaultForm: MenuForm = {
    menuName: "",
    parentId: null,
    pageUrl: "",
    icon: "",
    displayOrder: 0,
  };
  
  const [form, setForm] = useState<MenuForm>(defaultForm);
  const [originalData, setOriginalData] = useState<MenuForm | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { theme } = useTheme();
  const th = tc(theme);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const parentOptions: Option[] = useMemo(() => {
    const rootOption: Option = { id: "0", label: "Root", value: "0" };
    const topLevelMenus = menus
      .filter((menu) => menu.ParentId === 0 || menu.ParentId === "0")
      .map((menu) => ({
        id: menu.MenuId,
        label: menu.MenuName,
        value: menu.MenuId,
      }));
    return [rootOption, ...topLevelMenus];
  }, [menus]);

  const selectedParent = useMemo(() => {
    const parentValue = form.parentId?.toString() || "0";
    return (
      parentOptions.find((opt) => opt.value.toString() === parentValue) ||
      parentOptions[0]
    );
  }, [form.parentId, parentOptions]);

  const handleInputChange = (field: keyof MenuForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const [errors, setErrors] = useState<{
    menuName?: string;
    pageUrl?: string;
    displayOrder?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.menuName)
      newErrors.menuName = t("text.requiredName", {
        key: t("text.menu"),
      });
    if (!form.pageUrl)
      newErrors.pageUrl = t("text.required", {
        key: t("text.pageURL"),
      });
    if (!form.displayOrder && form.displayOrder !== 0)
      newErrors.displayOrder = t("text.required", {
        key: t("text.displayNo"),
      });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      id: editingId || undefined,
      menuName: form.menuName,
      parentId: form.parentId === "0" ? null : form.parentId,
      pageUrl: form.pageUrl,
      icon: form.icon,
      displayOrder: form.displayOrder,
      isMenu: true,
      defaultPermissions: {
        isAdd: false,
        isEdit: false,
        isDel: false,
        isView: false,
        isPrint: false,
        isExport: false,
        isRelease: false,
        isPost: false,
      },
    };

    try {
      await dispatch(saveMenu(payload)).unwrap();
      toast.success(
        editingId 
          ? t("text.updateToast", { key: t("text.menu") })
          : t("text.createToast", { key: t("text.menu") })
      );
      resetForm(true);
      dispatch(fetchMenus());
    } catch {
      toast.error(t("text.saveErrorToast", { key: t("text.menu") }));
    }
  };

  const handleEdit = (menu: any) => {
    const currentData = {
      menuName: menu.MenuName,
      parentId: menu.ParentId?.toString() || "0",
      pageUrl: menu.PageUrl,
      icon: menu.Icon || "",
      displayOrder: menu.DisplayNo,
    };
    setForm(currentData);
    setEditingId(menu.MenuId);
    setOriginalData(currentData);
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await dispatch(deleteMenu(deleteId)).unwrap();
        toast.success(
          t("text.deleteToast", {
            key: t("text.menu"),
          })
        );
        setDeleteId(null);
        dispatch(fetchMenus());
      } catch {
        toast.error(
          t("text.deleteErrorToast", {
            key: t("text.menu"),
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

  // Prepare data for DataGrid with proper ID mapping
  const gridData = menus.map((menu: any) => ({
    ...menu,
    id: menu.MenuId, // Map MenuId to id for DataGrid
  }));

  return (
    <div
      className={`w-full px-4 py-6 transition-colors ${th.background} ${th.text}`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 px-1">
        <div>
          <h1
            className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${th.text}`}
          >
            <ListChecks className="text-indigo-600 w-6 h-6" />
            {t("text.management", {
              key: t("text.menu"),
            })}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Helpdesk menuId={17} />
        </div>
      </div>
      
   
        <div
          className={`rounded-xl shadow-md p-4 mb-6 transition-colors ${th.card}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              placeholder={t("text.enterName", {
                key: t("text.menu"),
              })}
              label={t("text.menuname")}
              value={form.menuName}
              onChange={(e) => handleInputChange("menuName", e.target.value)}
              error={errors.menuName}
            />
            
            <AutoCompleteSelect
              label={t("text.parentMenu")}
              options={parentOptions}
              selected={selectedParent}
              onChange={(option) =>
                handleInputChange("parentId", option.value)
              }
              placeholder={t("text.select", {
                key: t("text.parentMenu"),
              })}
              fullWidth
            />

            <TextField
              placeholder={t("text.enter", {
                key: t("text.pageURL"),
              })}
              label={t("text.pageURL")}
              value={form.pageUrl}
              onChange={(e) => handleInputChange("pageUrl", e.target.value)}
              error={errors.pageUrl}
            />
            
            <TextField
              placeholder={t("text.enterName", {
                key: t("text.icon"),
              })}
              label={t("text.icon")}
              value={form.icon}
              onChange={(e) => handleInputChange("icon", e.target.value)}
            />
            
            <TextField
              label={t("text.displayNo")}
              type="number"
              value={form.displayOrder.toString()}
              onChange={(e) =>
                handleInputChange("displayOrder", Number(e.target.value))
              }
              error={errors.displayOrder}
            />
          </div>

          <div className="mt-4 flex flex-row sm:flex-row gap-4 w-full">
            <Button
              icon={editingId ? <FaEdit /> : <FaSave />}
              text={editingId ? t("text.update") : t("text.save")}
              onClick={handleSubmit}
              bgColor={`${th.button.primary}`}
              className="w-1/2 sm:w-auto"
              disabled={loading}
            />
            <Button
              icon={<IoMdRefresh />}
              text={t("text.reset")}
              onClick={() => resetForm()}
              bgColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
              className="w-1/2 sm:w-auto"
              disabled={loading}
            />
          </div>
        </div>
      

      <DataGrid
        columns={[
          { key: "MenuName", header: t("text.menuName") },
          { key: "PageUrl", header: t("text.pageURL") },
          { key: "Icon", header: t("text.icon") },
          { key: "DisplayNo", header: t("text.displayNo") },
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
            key: t("text.menu"),
          })}
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          confirmColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
        />
      )}
    </div>
  );
};

export default MenuPage;