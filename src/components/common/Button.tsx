import React from "react";
import clsx from "clsx";

interface ThemeButtonProps {
  text: string;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<ThemeButtonProps> = ({
  text,
  icon,
  bgColor = "bg-indigo-600",
  textColor = "text-white",
  fullWidth = false,
  onClick,
  disabled = false,
  className,
  loading = false,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm hover:opacity-90 transition",
        bgColor,
        textColor,
        disabled && "opacity-50 cursor-not-allowed",
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>Loading</span>
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};
export default Button;














// import React from "react";
// import clsx from "clsx";

// interface ThemeButtonProps {
//   text: string;
//   icon?: React.ReactNode;
//   bgColor?: string;
//   textColor?: string;
//   fullWidth?: boolean; // optional, default false
//   onClick?: () => void;
//   disabled?: boolean;
//   className?: string;
// }

// const Button: React.FC<ThemeButtonProps> = ({
//   text,
//   icon,
//   bgColor = "bg-indigo-600",
//   textColor = "text-white",
//   fullWidth = false,
//   onClick,
//   disabled = false,
//   className,
// }) => {
//   return (
//     <button
//       type="button"
//       disabled={disabled}
//       onClick={onClick}
//       className={clsx(
//         "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm hover:opacity-90 transition",
//         bgColor,
//         textColor,
//         disabled && "opacity-50 cursor-not-allowed",
//         fullWidth && "w-full", // only apply if fullWidth is true
//         className // parent classes (like w-1/2, sm:w-auto) take precedence
//       )}
//     >
//       {icon && <span>{icon}</span>}
//       {text}
//     </button>
//   );
// };

// export default Button;

