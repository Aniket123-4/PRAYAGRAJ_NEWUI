import React, { useEffect, useState } from "react";
import { FiHelpCircle } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchHelpContent } from "../../redux/slices/helpSlice";
import { useTheme } from "../../contexts/ThemeContext";
//import { useThemeClasses } from "../../utils/themeUtils";
import { useTranslation } from "react-i18next";
import { themeClasses as tc } from "../../components/ThemeClasses";

interface HelpdeskProps {
  menuId: number;
  buttonClassName?: string;
  iconClassName?: string;
}

const Helpdesk: React.FC<HelpdeskProps> = ({
  menuId,
  buttonClassName = "",
  iconClassName = "",
}) => {
  const dispatch = useAppDispatch();
  const {
    content: helpContent,
    loading,
    error,
  } = useAppSelector((state) => state.help);

  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  // const themeClasses = useThemeClasses();
  const { t } = useTranslation();
  const th = tc(theme);

  useEffect(() => {
    if (open && menuId) {
      dispatch(fetchHelpContent(menuId));
    }
  }, [open, menuId, dispatch]);

  const toggleModal = () => {
    setOpen(!open);
    if (!open && menuId) {
      dispatch(fetchHelpContent(menuId));
    }
  };

  return (
    <>
      <button
        type="button"
        className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg shadow ${th.button.primary} ${buttonClassName}`}
        onClick={toggleModal}
      >
        <FiHelpCircle className={`w-4 h-4 ${iconClassName}`} />
        {t("text.help")}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-2 sm:items-center sm:p-0">
            <div
              className={`fixed inset-0 transition-opacity duration-300 ease-in-out backdrop-blur-sm ${
                theme === "dark" ? "bg-gray-900/70" : "bg-gray-900/50"
              }`}
              onClick={toggleModal}
              aria-hidden="true"
            ></div>

            <div
              className={`relative transform overflow-hidden rounded-lg shadow-2xl transition-all w-full mx-0 sm:mx-2 sm:max-w-2xl lg:max-w-4xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              {/* Header */}
              <div
                className={`px-3 py-2 sm:px-4 shadow-sm ${
                  theme === "dark"
                    ? "bg-gray-700"
                    : "bg-gradient-to-r from-blue-600 to-indigo-700"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-md ${
                        theme === "dark" ? "bg-gray-600/30" : "bg-white/10"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white sm:text-lg">
                        {t("text.helpCenter")}
                      </h2>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-gray-300" : "text-blue-100"
                        } opacity-90`}
                      >
                        {t("text.quickAssistanceForThisPage")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleModal}
                    className={`hover:text-white transition-colors duration-200 ${
                      theme === "dark" ? "text-gray-300" : "text-blue-100"
                    }`}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 max-h-[70vh] overflow-y-auto">
                {loading && <p>Loading help content...</p>}
                {error && (
                  <p className="text-red-500 font-medium">
                    Error: {String(error)}
                  </p>
                )}
                {!loading && !error && helpContent?.description ? (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: helpContent.description,
                    }}
                  />
                ) : (
                  !loading &&
                  !error && (
                    <p className="text-gray-500">
                      No help content available for this page.
                    </p>
                  )
                )}
              </div>

              {/* Footer */}
              <div
                className={`border-t px-3 py-2 sm:px-4 ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p
                    className={`text-xs hidden sm:block ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {t("text.lastUpdated")}: {new Date().toLocaleDateString()}
                  </p>
                  <button
                    onClick={toggleModal}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                      theme === "dark"
                        ? "bg-gray-600 text-white hover:bg-gray-500"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {t("text.closeHelp")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Helpdesk;
