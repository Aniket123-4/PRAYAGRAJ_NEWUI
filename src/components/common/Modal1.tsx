import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../ThemeClasses";

interface Modal1Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const Modal1: React.FC<Modal1Props> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  const { theme } = useTheme();
  const th = tc(theme);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${th.background} bg-opacity-90`}
    >
      <div
        className={`w-full ${sizeClasses[size]} ${th.card} rounded-xl shadow-xl overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className={`text-lg font-medium ${th.text}`}>{title}</h3>
          <button
            onClick={onClose}
            className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${th.text}`}
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal1;