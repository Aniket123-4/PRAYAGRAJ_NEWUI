import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses } from "../ThemeClasses";
import { FaDownload, FaTimes } from "react-icons/fa";

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfBase64?: string;
  fileName?: string;
  title?: string;
}

const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
  isOpen,
  onClose,
  pdfBase64,
  fileName = "document.pdf",
  title = "Document Preview"
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const th = themeClasses(theme);
  const [iframeSrc, setIframeSrc] = useState<string>("");

  useEffect(() => {
    if (pdfBase64) {
      setIframeSrc(`data:application/pdf;base64,${pdfBase64}`);
    }
  }, [pdfBase64]);

  const handleDownload = () => {
    if (pdfBase64) {
      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${pdfBase64}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal panel */}
        <div
          className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full ${th.modal} ${th.border}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Header */}
          <div className={`px-4 py-3 sm:px-6 flex justify-between items-center ${th.border}`}>
            <h3
              className="text-lg leading-6 font-medium"
              id="modal-headline"
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              className={`p-1 rounded-full hover:bg-opacity-20 ${th.hoverBg} focus:outline-none`}
              aria-label="Close"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 py-5 sm:p-6">
            <div className="h-[70vh] w-full">
              {iframeSrc ? (
                <iframe
                  src={iframeSrc}
                  width="100%"
                  height="100%"
                  title="PDF Preview"
                  className={`border rounded-lg ${th.border}`}
                />
              ) : (
                <div className={`flex items-center justify-center h-full ${th.text}`}>
                  <p>{t("text.loadingPdf")}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className={`px-4 py-3 sm:px-6 flex justify-end gap-2 ${th.border}`}>
            <button
              onClick={handleDownload}
              className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium ${th.button.primary}`}
            >
              <FaDownload className="mr-2" />
              {t("text.download")}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreviewModal;