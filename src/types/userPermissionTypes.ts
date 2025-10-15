// src/types/userPermissionTypes.ts
export interface PermissionRow {
  id: string;
  menuId: number;
  parentId: number;
  menuName: string;
  parentMenuName: string;
  isAdd: boolean;
  isEdit: boolean;
  isDel: boolean;
  isView: boolean;
  isPrint: boolean;
  isExport: boolean;
  isRelease: boolean;
  isPost: boolean;
  UserId: string;
}

export type PermissionKey = 
  | 'isAdd' 
  | 'isEdit' 
  | 'isDel' 
  | 'isView' 
  | 'isPrint' 
  | 'isExport' 
  | 'isRelease' 
  | 'isPost';

  