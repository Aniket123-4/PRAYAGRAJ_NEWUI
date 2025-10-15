import { useEffect, useState } from "react";

interface MenuPermission {
  menuId: number;
  menuName: string;
  isAdd: boolean | string;
  isEdit: boolean | string;
  isDel: boolean | string;
  isView: boolean | string;
  isPrint: boolean | string;
  isExport: boolean | string;
  isRelease: boolean | string;
  isPost: boolean | string;
}

export function hasAnyPermissions(): boolean {
  try {
    const storedMenus = localStorage.getItem("permissions");
    if (!storedMenus) return false;

    const menus: MenuPermission[] = JSON.parse(storedMenus);
    return menus.some(
      (menu) =>
        menu.isAdd ||
        menu.isEdit ||
        menu.isDel ||
        menu.isView ||
        menu.isPrint ||
        menu.isExport ||
        menu.isRelease ||
        menu.isPost
    );
  } catch (error) {
    console.error("Error checking permissions:", error);
    return false;
  }
}

export function usePermissionByMenuName(menuName: string) {
  const [permission, setPermission] = useState<MenuPermission | null>(null);

  useEffect(() => {
    console.log("Fetching permissions for:", menuName);

    try {
      const storedMenus = localStorage.getItem("permissions");
      const userHasNoPermissions = !hasAnyPermissions();

      // Default permissions for specific menus when user has no permissions
      if (
        userHasNoPermissions &&
        (menuName.trim() === "Complainant" ||
          menuName.trim() === "Complaint Master" ||
          menuName.trim() === "Complaint Report")
      ) {
        const defaultPermission: MenuPermission = {
          menuId:
            menuName.trim() === "Complainant"
              ? 27
              : menuName.trim() === "Complaint Master"
              ? 23
              : 32, // For "Complaint Report"
          menuName: menuName,
          isAdd: true,
          isEdit: true,
          isDel: true,
          isView: true, // Allow view
          isPrint: false,
          isExport: false,
          isRelease: false,
          isPost: false,
        };
        setPermission(defaultPermission);
        return;
      }

      if (!storedMenus) {
        console.warn("No menus found in localStorage.");
        setPermission(null);
        return;
      }

      const menus: MenuPermission[] = JSON.parse(storedMenus);
      console.log("Parsed menus:", menus);

      const found = menus.find(
        (menu) => menu.menuName.trim() === menuName.trim()
      );

      if (found) {
        console.log("Found permission:", found);
        found.isAdd = found.isAdd === true || found.isAdd === "true";
        found.isEdit = found.isEdit === true || found.isEdit === "true";
        found.isDel = found.isDel === true || found.isDel === "true";
        found.isView = found.isView === true || found.isView === "true";
        found.isPrint = found.isPrint === true || found.isPrint === "true";
        found.isExport = found.isExport === true || found.isExport === "true";
        found.isRelease =
          found.isRelease === true || found.isRelease === "true";
        found.isPost = found.isPost === true || found.isPost === "true";

        setPermission(found);
      } else {
        console.warn(`No permission found for menuName: ${menuName}`);
        setPermission(null);
      }
    } catch (error) {
      console.error("Error parsing permissions from localStorage:", error);
      setPermission(null);
    }
  }, [menuName]);

  return permission;
}
