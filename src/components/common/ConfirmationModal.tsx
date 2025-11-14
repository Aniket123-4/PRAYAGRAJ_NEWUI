import React from "react";
import Button from "./Button";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses } from "../ThemeClasses";
import { X } from "lucide-react"; 
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
  isLoading?: boolean;
  cancelMessage?: string;

}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmColor,
  cancelColor,
  isLoading = false,
  cancelMessage ="Action cancelled",

}) => {
  const { theme } = useTheme();
  const th = themeClasses(theme);
  const { t } = useTranslation();

  const confirmBtnColor =
    confirmColor ?? (theme === "dark" ? "bg-red-700" : "bg-red-600");
  const cancelBtnColor =
    cancelColor ?? (theme === "dark" ? "bg-gray-700" : "bg-gray-500");

const handleClose = () => {
    onCancel();
   toast.warn(cancelMessage, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme === 'dark' ? 'dark' : 'light',
      toastId: 'confirmation-modal-toast',
      
    });
  };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-xl shadow-xl max-w-md w-full p-6 relative transition-colors ${th.card} ${th.text}`}
      >
        <button
          onClick={onCancel}
          disabled={isLoading}
          className={`absolute top-3 right-3 p-1 rounded-full transition-colors
                      ${th.text} hover:bg-gray-200 dark:hover:bg-gray-700`}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h3 className={`text-xl font-semibold mb-2 ${th.text}`}>{title}</h3>
        <p className={`mb-6 ${th.subText}`}>{message}</p>

        <div className="flex justify-end gap-3">
          <Button
            icon={<MdCancel />}
            text={t("text.cancel")}
            bgColor={cancelBtnColor}
            onClick={handleClose}
            disabled={isLoading}
            fullWidth={false}
          />
          <Button
            icon={<GiConfirmed />}
            text={t("text.confirm")}
            bgColor={confirmBtnColor}
            onClick={onConfirm}
            disabled={isLoading}
            fullWidth={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
