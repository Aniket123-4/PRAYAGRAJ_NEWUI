// utils/iconMapper.ts
import React from "react";
import {
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiBell,
  FiUser,
  FiMenu,
  FiX,
  FiAlertOctagon,
  FiRepeat,
  FiMapPin,
} from "react-icons/fi";
import { BsBuildingCheck } from "react-icons/bs";

const icons = {
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiBell,
  FiUser,
  FiMenu,
  FiX,
  FiAlertOctagon,
  BsBuildingCheck,
  FiMapPin ,
  FiRepeat    
};

export function getIcon(name: string, className = "w-5 h-5"): React.ReactNode {
  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} /> : null;
}
