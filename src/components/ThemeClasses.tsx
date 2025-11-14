// Update your themeClasses utility to handle all themes
type ThemeType = "light" | "dark" | "bhagwa" | "ocean" | "sunset" | "forest";

export const themeClasses = (theme: ThemeType) => {
  // Default to light theme if no match
  const baseClasses = {
    background: "bg-white",
    text: "text-gray-800",
    subText: "text-gray-600",
    border: "border-gray-200",
    card: "bg-white border-gray-200",
    headerBorder: "border-gray-100",
    hoverBg: "hover:bg-gray-50",
    hoverText: "hover:text-gray-900",
    dropdownBg: "bg-white",
    dropdownText: "text-gray-700",
    dropdownHoverBg: "hover:bg-gray-100",
    dropdownHoverText: "hover:text-primary-600",
    activeBg: "from-primary-50 to-primary-100",
    activeText: "text-primary-700",
    notificationBg: "bg-white",
    notificationText: "text-gray-700",
    notificationBorder: "border-gray-100",
    input:
      "bg-white border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500",
    button: {
      primary: "bg-blue-900 hover:bg-blue-1000 text-white",
      secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
      danger: "bg-red-600 hover:bg-red-700 text-white",
    },
    tableHeader: "bg-blue-900 text-white",
    tableRow: "hover:bg-gray-50",
    modal: "bg-white text-gray-800",
    disabledInput: "bg-gray-100 text-gray-400 cursor-not-allowed",
    disabledCard: "bg-gray-400 border-gray-200 cursor-not-allowed",
  };

  if (theme === "dark") {
    return {
      ...baseClasses,
      background: "bg-gray-900",
      text: "text-white",
      subText: "text-gray-300",
      border: "border-gray-700",
      card: "bg-gray-800 border-gray-700",
      headerBorder: "border-gray-800",
      hoverBg: "hover:bg-gray-800",
      hoverText: "hover:text-gray-200",
      dropdownBg: "bg-gray-800",
      dropdownText: "text-gray-200",
      dropdownHoverBg: "hover:bg-gray-700",
      dropdownHoverText: "hover:text-primary-300",
      activeBg: "from-primary-900 to-primary-800",
      activeText: "text-primary-100",
      notificationBg: "bg-gray-800",
      notificationText: "text-gray-200",
      notificationBorder: "border-gray-700",
      input:
        "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500",
      button: {
        primary: "bg-blue-700 hover:bg-blue-800 text-white",
        secondary: "bg-gray-700 hover:bg-gray-600 text-white",
        danger: "bg-red-700 hover:bg-red-800 text-white",
      },
      tableRow: "hover:bg-gray-700",
      modal: "bg-gray-800 text-white",
      disabledInput: "bg-white-100 text-white-400 cursor-not-allowed",
    };
  }

  if (theme === "bhagwa") {
    return {
      ...baseClasses,
      background: "bg-orange-200",
      text: "text-orange-900",
      subText: "text-orange-700",
      border: "border-orange-200",
      card: "bg-orange-100 border-orange-200",
      headerBorder: "border-orange-100",
      hoverBg: "hover:bg-orange-50",
      hoverText: "hover:text-orange-900",
      dropdownBg: "bg-orange-100",
      dropdownText: "text-orange-900",
      dropdownHoverBg: "hover:bg-orange-200",
      dropdownHoverText: "hover:text-orange-800",
      activeBg: "from-orange-200 to-orange-300",
      activeText: "text-orange-800",
      notificationBg: "bg-orange-100",
      notificationText: "text-orange-900",
      notificationBorder: "border-orange-200",
      input:
        "bg-orange-50 border-orange-300 text-orange-900 focus:ring-orange-500 focus:border-orange-500",
      button: {
        primary: "bg-orange-700 hover:bg-orange-800 text-white",
        secondary: "bg-orange-100 hover:bg-orange-200 text-orange-800",
        danger: "bg-red-600 hover:bg-red-700 text-white",
      },
      tableHeader: "bg-orange-700 text-white",
      tableRow: "hover:bg-orange-50",
      modal: "bg-orange-100 text-orange-900",
      disabledInput: "bg-yellow-100 text-yellow-400 cursor-not-allowed",
    };
  }

  if (theme === "ocean") {
    return {
      ...baseClasses,
      background: "bg-blue-100",
      text: "text-blue-900",
      subText: "text-blue-700",
      border: "border-blue-200",
      card: "bg-blue-100 border-blue-200",
      headerBorder: "border-blue-100",
      hoverBg: "hover:bg-blue-50",
      hoverText: "hover:text-blue-900",
      dropdownBg: "bg-blue-100",
      dropdownText: "text-blue-900",
      dropdownHoverBg: "hover:bg-blue-200",
      dropdownHoverText: "hover:text-blue-800",
      activeBg: "from-blue-200 to-blue-300",
      activeText: "text-blue-800",
      notificationBg: "bg-blue-100",
      notificationText: "text-blue-900",
      notificationBorder: "border-blue-200",
      input:
        "bg-blue-50 border-blue-300 text-blue-900 focus:ring-blue-500 focus:border-blue-500",
      button: {
        primary: "bg-blue-700 hover:bg-blue-800 text-white",
        secondary: "bg-blue-100 hover:bg-blue-200 text-blue-800",
        danger: "bg-red-600 hover:bg-red-700 text-white",
      },
      tableHeader: "bg-blue-700 text-white",
      tableRow: "hover:bg-blue-50",
      modal: "bg-blue-100 text-blue-900",
      disabledInput: "bg-blue-200 text-blue-500 cursor-not-allowed",
    };
  }

  if (theme === "sunset") {
    return {
      ...baseClasses,
      background: "bg-pink-100",
      text: "text-pink-900",
      subText: "text-pink-700",
      border: "border-pink-200",
      card: "bg-pink-100 border-pink-200",
      headerBorder: "border-pink-100",
      hoverBg: "hover:bg-pink-50",
      hoverText: "hover:text-pink-900",
      dropdownBg: "bg-pink-100",
      dropdownText: "text-pink-900",
      dropdownHoverBg: "hover:bg-pink-200",
      dropdownHoverText: "hover:text-pink-800",
      activeBg: "from-pink-200 to-pink-300",
      activeText: "text-pink-800",
      notificationBg: "bg-pink-100",
      notificationText: "text-pink-900",
      notificationBorder: "border-pink-200",
      input:
        "bg-pink-50 border-pink-300 text-pink-900 focus:ring-pink-500 focus:border-pink-500",
      button: {
        primary: "bg-pink-700 hover:bg-pink-800 text-white",
        secondary: "bg-pink-100 hover:bg-pink-200 text-pink-800",
        danger: "bg-red-600 hover:bg-red-700 text-white",
      },
      tableHeader: "bg-pink-700 text-white",
      tableRow: "hover:bg-pink-50",
      modal: "bg-pink-100 text-pink-900",
      disabledInput: "bg-pink-200 text-pink-500 cursor-not-allowed",
    };
  }

  if (theme === "forest") {
    return {
      ...baseClasses,
      background: "bg-green-100",
      text: "text-green-900",
      subText: "text-green-700",
      border: "border-green-200",
      card: "bg-green-100 border-green-200",
      headerBorder: "border-green-100",
      hoverBg: "hover:bg-green-50",
      hoverText: "hover:text-green-900",
      dropdownBg: "bg-green-100",
      dropdownText: "text-green-900",
      dropdownHoverBg: "hover:bg-green-200",
      dropdownHoverText: "hover:text-green-800",
      activeBg: "from-green-200 to-green-300",
      activeText: "text-green-800",
      notificationBg: "bg-green-100",
      notificationText: "text-green-900",
      notificationBorder: "border-green-200",
      input:
        "bg-green-50 border-green-300 text-green-900 focus:ring-green-500 focus:border-green-500",
      button: {
        primary: "bg-green-700 hover:bg-green-900 text-white",
        secondary: "bg-green-100 hover:bg-green-200 text-green-800",
        danger: "bg-red-600 hover:bg-red-700 text-white",
      },
      tableHeader: "bg-green-700 text-white",
      tableRow: "hover:bg-green-50",
      modal: "bg-green-100 text-green-900",
      disabledInput: "bg-green-200 text-green-500 cursor-not-allowed",
    };
  }

  return baseClasses;
};
