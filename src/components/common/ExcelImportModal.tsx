import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";
import { useTranslation } from "react-i18next";

interface ExcelImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (data: any[]) => void;
  requiredFields: string[];
  sampleData: any;
}

const ExcelImportModal: React.FC<ExcelImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
  requiredFields,
  sampleData,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const themeClasses = tc(theme);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset all state when modal closes
  const resetModal = () => {
    setFile(null);
    setError(null);
    setPreviewData([]);
    setAllData([]);
    setIsLoading(false);
  };

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setIsLoading(true);
      
      try {
        const data = await e.target.files[0].arrayBuffer();
        const workbook = XLSX.read(data);
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        // Validate headers
        if (jsonData.length > 0) {
          //@ts-ignore
          const headers = Object.keys(jsonData[0]);
          const missingFields = requiredFields.filter(
            field => !headers.some(h => h.toLowerCase() === field.toLowerCase())
          );

          if (missingFields.length > 0) {
            setError(`${t("text.missingRequiredFields")}: ${missingFields.join(", ")}`);
            return;
          }
        }

        setAllData(jsonData);
        setPreviewData(jsonData.slice(0, 5));
      } catch (err) {
        setError(t("text.invalidExcelFile"));
        console.error("Error parsing Excel file:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleImport = () => {
    if (!file) {
      setError(t("text.noFileSelected"));
      return;
    }

    if (allData.length === 0) {
      setError(t("text.noDataToImport"));
      return;
    }

    onImport(allData);
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className={`rounded-lg p-6 w-full max-w-4xl max-h-[90vh] flex flex-col ${themeClasses.card} ${themeClasses.text}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t("text.importFromExcel")}</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="mb-4">
            <p className="mb-2 font-semibold">{t("text.requiredFields")}:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {requiredFields.map((field) => (
                <span key={field} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {field}
                </span>
              ))}
            </div>
            
            <p className="mb-2 font-semibold">{t("text.sampleFormat")}:</p>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border text-sm">
                <thead>
                  <tr>
                    {Object.keys(sampleData).map((key) => (
                      <th key={key} className="border px-3 py-2 bg-gray-100">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.values(sampleData).map((value, index) => (
                      <td key={index} className="border px-3 py-2">{value as string}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">{t("text.selectExcelFile")}</label>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {isLoading && (
            <div className="mb-4 flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading file...
            </div>
          )}

          {previewData.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 font-semibold">{t("text.previewData")} (first 5 rows):</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm">
                  <thead>
                    <tr>
                      {Object.keys(previewData[0]).map((key) => (
                        <th key={key} className="border px-3 py-2 bg-gray-100">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, cellIndex) => (
                          <td key={cellIndex} className="border px-3 py-2">{value as string}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Showing 5 of {allData.length} records
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm sm:text-base"
          >
            {t("text.cancel")}
          </button>
          <button
            onClick={handleImport}
            disabled={!file || allData.length === 0}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 text-sm sm:text-base"
          >
            {t("text.import")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcelImportModal;