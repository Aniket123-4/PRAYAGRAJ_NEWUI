import React, { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchMenus,
  fetchHelpContent,
  createHelpContent,
  updateHelpContent,
  resetContent,
} from "../../redux/slices/helpSlice";
import RichTextEditor from "../../components/common/RichTextEditor";
import { FiSave, FiRefreshCw, FiFileText } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useTheme } from "../../contexts/ThemeContext";
import { useThemeClasses } from "../../utils/themeUtils";
import { usePermissionByMenuName } from "../../hooks/usePermission";
import { useTranslation } from "react-i18next";
import { themeClasses as tc } from "../../components/ThemeClasses";

interface SelectOption {
  value: number;
  label: string;
  group?: string;
}

const HelpCreation: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    menus, // This should be typed as MenuItem[] from your Redux slice
    content: helpContent,
    loading,
    error,
  } = useAppSelector((state) => state.help);

  const themeClasses = useThemeClasses();
  const { theme } = useTheme();
  const permission = usePermissionByMenuName("Help Creation");

  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const { t } = useTranslation();
  const th = tc(theme);
  // Fetch menus on component mount
  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  // Update select options when menus change
  useEffect(() => {
    if (menus.length > 0) {
      const options: SelectOption[] = [];
      const parentMenus = menus.filter((menu) => menu.ParentId === 0);
      const childMenus = menus.filter((menu) => menu.ParentId !== 0);

      parentMenus.forEach((parent) => {
        const children = childMenus.filter(
          (child) => child.ParentId === parent.MenuId
        );

        if (children.length > 0) {
          children.forEach((child) => {
            options.push({
              value: child.MenuId,
              label: child.MenuName,
              group: parent.MenuName,
            });
          });
        } else {
          options.push({
            value: parent.MenuId,
            label: parent.MenuName,
          });
        }
      });

      setSelectOptions(options);
    }
  }, [menus]);

  // Update editor content when help content changes
  useEffect(() => {
    if (helpContent) {
      setEditorContent(helpContent.description);
    } else {
      setEditorContent("");
    }
  }, [helpContent]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const groupedOptions = useMemo(() => {
    const groups = new Map<string, SelectOption[]>();

    selectOptions.forEach((option) => {
      if (option.group) {
        if (!groups.has(option.group)) {
          groups.set(option.group, []);
        }
        groups.get(option.group)?.push(option);
      } else {
        if (!groups.has("Other")) {
          groups.set("Other", []);
        }
        groups.get("Other")?.push(option);
      }
    });

    return Array.from(groups.entries()).map(([label, options]) => ({
      label,
      options,
    }));
  }, [selectOptions]);

  const handleMenuChange = async (selectedOption: SelectOption | null) => {
    if (!selectedOption) return;
    setSelectedMenuId(selectedOption.value);
    dispatch(fetchHelpContent(selectedOption.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMenuId || !editorContent) return;

    const selectedMenu = menus.find((menu) => menu.MenuId === selectedMenuId);
    if (!selectedMenu) return;

    const payload = {
      menuId: String(selectedMenuId),
      menuName: selectedMenu.MenuName,
      description: editorContent,
    };

    try {
      if (helpContent) {
        // @ts-ignore
        await dispatch(updateHelpContent(payload)).unwrap();
        toast.success("Help content updated successfully!");
        setEditorContent("");
        setSelectedMenuId(null);
      } else {
        // @ts-ignore
        await dispatch(createHelpContent(payload)).unwrap();
        toast.success("Help content created successfully!");
        setEditorContent("");
        setSelectedMenuId(null);
      }
    } catch (err) {
      toast.error(
        `Failed to ${helpContent ? "update" : "create"} help content`
      );
    }
  };

  const handleReset = () => {
    dispatch(resetContent());
    setSelectedMenuId(null);
    setEditorContent("");
    //toast.info("Form has been reset");
  };

  // Custom styles for react-select based on theme
  const customSelectStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: "36px",
      fontSize: "14px",
      backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
      borderColor: theme === "dark" ? "#4b5563" : "#d1d5db",
      color: theme === "dark" ? "#f3f4f6" : "#111827",
      "&:hover": {
        borderColor: theme === "dark" ? "#6b7280" : "#9ca3af",
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
      color: theme === "dark" ? "#f3f4f6" : "#111827",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#374151"
          : "#f3f4f6"
        : theme === "dark"
        ? "#1f2937"
        : "#ffffff",
      color: theme === "dark" ? "#f3f4f6" : "#111827",
      "&:active": {
        backgroundColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#f3f4f6" : "#111827",
    }),
    input: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#f3f4f6" : "#111827",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: theme === "dark" ? "#9ca3af" : "#6b7280",
    }),
  };

  if (!permission?.isView) {
    return (
      <div className="font-bold">{t("text.thisPageisUnderMaintenance")}</div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={theme === "dark" ? "dark" : "light"}
      />
      <div
        className={`w-full p-4 ${themeClasses.background} ${themeClasses.text}`}
      >
        <div>
          <h2
            className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${themeClasses.text}`}
          >
            <FiFileText className="text-blue-600 h-5 w-5" />
            {t("text.createHelpContent")}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`${themeClasses.background} ${themeClasses.text}`}
        >
          <div className="mb-2">
            <label
              className={`block text-sm font-medium mb-1 ${themeClasses.text}`}
            >
              {t("text.selectApplicationMenu")}
            </label>
            <Select
              options={groupedOptions}
              onChange={handleMenuChange}
              value={
                selectOptions.find(
                  (option) => option.value === selectedMenuId
                ) || null
              }
              placeholder={t("text.selectAMenuItem")}
              isDisabled={loading}
              isLoading={loading}
              className="react-select-container"
              classNamePrefix="react-select"
              styles={customSelectStyles}
            />
          </div>

          <div className="mb-2">
            <label
              className={`block text-sm font-medium mb-1 ${themeClasses.text}`}
            >
              {t("text.documentationContent")}
            </label>
            <div
              className={`border rounded-md shadow-sm overflow-scroll ${themeClasses.border}`}
            >
              <div
                className={`border rounded-md shadow-sm ${themeClasses.border}`}
              >
                <RichTextEditor
                  value={editorContent}
                  onChange={setEditorContent}
                  placeholder={t("text.typeInHindiOrEnglish")}
                  //@ts-ignore
                  theme={theme}
                />
              </div>
            </div>
          </div>

          {(permission?.isAdd || permission?.isEdit) && (
            // <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
            <div className="mt-4 flex flex-row sm:flex-row gap-4 w-full justify-end">
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className={`px-3 py-1 flex items-center justify-center gap-1.5 rounded-md shadow-sm text-sm font-medium ${themeClasses.button.secondary} disabled:opacity-50 transition-colors duration-150 w-1/2 sm:w-auto`}
              >
                <FiRefreshCw className="h-3 w-3" />
                {t("text.reset")}
              </button>
              <button
                type="submit"
                disabled={loading || !selectedMenuId || !editorContent}
                className={`px-3 py-1 flex items-center justify-center gap-1.5 rounded-md shadow-sm text-sm font-medium ${th.button.primary} disabled:opacity-50 transition-colors duration-150 w-1/2 sm:w-auto`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-3 w-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {helpContent ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <FiSave className="h-3 w-3" />
                    {helpContent ? t("text.update") : t("text.save")}
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default HelpCreation;
