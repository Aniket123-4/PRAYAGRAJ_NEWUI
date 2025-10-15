import React from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import { useAppSelector } from "../redux/hooks";
import { useTheme } from "../contexts/ThemeContext";
import { themeClasses } from "../components/ThemeClasses"; // Import themeClasses
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { theme } = useTheme();
  const classes = themeClasses(theme); // Get theme classes
  const { user } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  if (!user) return null;

  function formatDate(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const fields = [
    {
      label: t("text.nameVar"),
      value: `${user.FIRST_NAME} ${user.SUR_NAME}`,
      Icon: FiUser,
    },
    { label: t("text.email"), value: user.EMAIL, Icon: FiMail },
    { label: t("text.phone"), value: user.CUR_MOBILE || "—", Icon: FiPhone },
    {
      label: t("text.DOB"),
      value: formatDate(user.DOB) || "—",
      Icon: FiCalendar,
    },
    {
      label: t("text.role"),
      value: user.ROLE_NAME || "Super Admin",
      Icon: FiCheckCircle,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${classes.background} ${classes.border}
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${classes.border}`}
        >
          <h2 className={`text-xl font-bold ${classes.text}`}>
            {t("text.profile")}
          </h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${classes.hoverBg}`}
          >
            <FiX size={20} className={classes.text} />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="flex flex-col h-[calc(100vh-60px)]">
          <div className="flex-1 overflow-y-auto p-6">
            {/* Avatar + Status */}
            <div className="flex items-center space-x-4 mb-6">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold
                  ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-200"
                      : theme === "bhagwa"
                      ? "bg-orange-200 text-orange-800"
                      : "bg-blue-100 text-blue-600"
                  }`}
              >
                {user.FIRST_NAME?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className={`text-lg font-semibold ${classes.text}`}>
                  {user.FIRST_NAME} {user.SUR_NAME}
                </p>
                <span
                  className={`inline-block px-3 py-1 mt-1 text-xs rounded-full
                    ${
                      theme === "dark"
                        ? "bg-green-700 text-green-100"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {t("text.active")}
                </span>
              </div>
            </div>

            {/* Fields */}
            <h3
              className={`text-base font-semibold mb-3 border-b pb-2 ${classes.text} ${classes.border}`}
            >
              {t("text.personal")}
            </h3>
            <div className="space-y-3">
              {fields.map(({ label, value, Icon }) => (
                <div key={label} className="flex items-center space-x-3">
                  <Icon className="text-blue-500" />
                  <div>
                    <p className={`text-xs ${classes.subText}`}>{label}</p>
                    <p className={`font-medium ${classes.text}`}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer (always visible) */}
          <div className={`p-4 border-t ${classes.border}`}>
            <button
              className={`w-full py-2 rounded-lg ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : theme === "bhagwa"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
              onClick={() => alert("Edit profile coming soon")}
            >
              {t("text.editProfile")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDrawer;
