


import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
  ChevronsLeft,
  ChevronsRight,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

import { FiSearch } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../ThemeClasses";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useTranslation } from "react-i18next";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface ActionOption<T> {
  label: "View" | "Edit" | "Delete" | string;
  onClick: (row: T) => void;
  disabled?: (row: T) => boolean; // Add disabled property
  title?: (row: T) => string; // Add title property
}

interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: ActionOption<T>[];
  rowsPerPageOptions?: number[];
  initialRowsPerPage?: number;
}

type SortDirection = "asc" | "desc" | null;

function DataGrid<T extends { Id: number }>({
  columns,
  data,
  actions = [],
  rowsPerPageOptions = [5, 10, 25, 50, 100],
  initialRowsPerPage = 5,
}: DataGridProps<T>) {
  const { theme } = useTheme();
  const th = tc(theme);
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [data]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
      );
      if (sortDirection === "desc") {
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
    setPage(1);
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (aStr < bStr) return sortDirection === "asc" ? -1 : 1;
      if (aStr > bStr) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDirection]);

  const filteredData = useMemo(
    () =>
      sortedData.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      ),
    [search, sortedData]
  );

  const paginatedData = useMemo(
    () => filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage),
    [filteredData, page, rowsPerPage]
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
const getActionIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "view":
      return (
        <Eye
          size={16}
          className={theme === "dark" ? "text-blue-400" : "text-blue-500"}
        />
      );
    case "edit":
      return (
        <Pencil
          size={16}
          className={theme === "dark" ? "text-blue-400" : "text-blue-500"}
        />
      );
    case "delete":
      return (
        <Trash2
          size={16}
          className={theme === "dark" ? "text-red-400" : "text-red-500"}
        />
      );
    case "report":
      return (
        <FaFilePdf
          size={16}
          className={theme === "dark" ? "text-red-400" : "text-red-500"}
        />
      );
    case "review":
      return (
        <MdRateReview
          size={16}
          className={theme === "dark" ? "text-green-400" : "text-green-500"}
        />
      );
    default:
      return <span className={th.subText}>{label}</span>;
  }
};


  const getSortIcon = (key: keyof T) => {
    if (sortKey !== key)
      return <ArrowUpDown size={14} className="inline ml-1" />;
    if (sortDirection === "asc")
      return <ArrowUp size={14} className="inline ml-1" />;
    if (sortDirection === "desc")
      return <ArrowDown size={14} className="inline ml-1" />;
    return null;
  };

  const exportToExcel = () => {
    const excelData = filteredData.map((row) => {
      const obj: any = {};
      columns.forEach((col) => {
        obj[col.header] = row[col.key];
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "DataGridExport.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.header);
    const tableRows = filteredData.map((row) =>
      columns.map((col) => String(row[col.key] ?? ""))
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.save("DataGridExport.pdf");
  };

  return (
    <div
      className={`w-full rounded-xl shadow-xl p-4 overflow-x-auto transition-colors ${th.card}`}
    >
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <div className="relative w-full md:w-1/3 min-w-[200px]">
          <FiSearch
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${th.subText}`}
          />
          <input
            type="text"
            placeholder={t("text.search")}
            className={`w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-red-400 focus:outline-none transition-colors ${th.input}`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex flex-row sm:flex-row items-start sm:items-center gap-2 text-sm min-w-[200px]">
          <div
            className={`flex items-center gap-2 border rounded-md px-3 py-2 shadow-sm transition-colors ${th.card} w-1/2 sm:w-auto`}
          >
            <span className={`${th.text}`}>{t("text.totalRecords")}:</span>
            <span className={th.text}>{filteredData.length}</span>
          </div>

          <div className="relative w-1/2 sm:w-auto">
            <select
              onChange={(e) => {
                if (e.target.value === "pdf") exportToPDF();
                else if (e.target.value === "excel") exportToExcel();
                e.target.value = "";
              }}
              defaultValue=""
              className={`px-3 py-2 border rounded-md bg-white dark:bg-gray-900 shadow-sm text-sm cursor-pointer w-full sm:w-auto ${th.input}`}
            >
              <option value="" disabled hidden>
                {t("text.export")}
              </option>
              <option value="pdf">{t("text.exportasPDF")}</option>
              <option value="excel">{t("text.exportasExcel")}</option>
            </select>
          </div>
        </div>
      </div>

      <table
        className={`w-full min-w-max text-sm text-left table-auto ${th.text}`}
      >
        <thead className={th.tableHeader}>
          <tr>
            <th className="px-4 py-2 font-semibold">{t("text.S.No.")}</th>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-2 font-semibold cursor-pointer select-none"
                onClick={() => handleSort(col.key)}
              >
                <span className="flex items-center gap-1">
                  {col.header}
                  {getSortIcon(col.key)}
                </span>
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-2 font-semibold">{t("text.actions")}</th>
            )}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            // ⏳ LOADER
            <tr>
              <td colSpan={columns.length + (actions.length > 0 ? 2 : 1)}>
                <div className="mt-6 flex flex-col items-center justify-center h-24">
                  {/* Spinner */}
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-30"></div>
                  </div>

                  {/* Text */}
                  <span className="mt-3 text-sm font-medium text-gray-600 animate-pulse">
                    Loading data, please wait...
                  </span>
                </div>
              </td>
            </tr>
          ) : paginatedData.length > 0 ? (
            // ✅ DATA
            paginatedData.map((row, index) => (
              <tr
                key={row.Id}
                className={`border-b transition-colors ${th.border} ${th.tableRow}`}
              >
                <td className="px-4 py-3">
                  {(page - 1) * rowsPerPage + index + 1}
                </td>
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      {actions.map((action, idx) => {
                        const isDisabled = action.disabled ? action.disabled(row) : false;
                        const titleText = action.title ? action.title(row) : action.label;
                        
                        return (
                          <button
                            key={idx}
                            onClick={() => !isDisabled && action.onClick(row)}
                            disabled={isDisabled}
                            title={titleText}
                            className={`p-1 rounded transition-colors ${
                              isDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : theme === "dark"
                                ? "hover:bg-gray-700"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {getActionIcon(action.label)}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (actions.length > 0 ? 2 : 1)}>
                <div className="flex flex-col items-center justify-center h-20 text-gray-500 pt-4">
                  {/* No data message */}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 ${th.subText}`}
      >
        <span className="mb-2 sm:mb-0">
          {t("text.Page")} {page} {t("text.of")} {totalPages || 1}
        </span>

        <div className="flex items-center gap-4 sm:gap-6 justify-end">
          {/* Left controls (rows per page) */}
          <div className="flex items-center gap-2">
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className={`px-2 py-1 border rounded-md focus:outline-none transition-colors ${th.input}`}
            >
              {rowsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {`${opt} / ${t("text.page")}`}
                </option>
              ))}
            </select>
          </div>

          {/* Right controls (pagination buttons) */}
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(1)}
              className={`p-2 rounded disabled:opacity-50 transition-colors ${th.button.secondary}`}
              title={t("text.firstPage")}
            >
              <ChevronsLeft size={16} />
            </button>

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`p-2 rounded disabled:opacity-50 transition-colors ${th.button.secondary}`}
              title={t("text.previousPage")}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => p + 1)}
              className={`p-2 rounded disabled:opacity-50 transition-colors ${th.button.secondary}`}
              title={t("text.nextPage")}
            >
              <ChevronRight size={16} />
            </button>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(totalPages)}
              className={`p-2 rounded disabled:opacity-50 transition-colors ${th.button.secondary}`}
              title={t("text.lastPage")}
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataGrid;