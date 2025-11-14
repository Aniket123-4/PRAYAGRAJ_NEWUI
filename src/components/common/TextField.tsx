import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../ThemeClasses";

interface TextFieldProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  fullWidth?: boolean;
  width?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  min?: any;
  max?: any;
  step?: string;
  maxLength?: number;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void; // ✅ Added
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // ✅ Added
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  error,
  fullWidth = false,
  width = "",
  className = "",
  inputClassName = "",
  required = false,
  min,
  max,
  step,
  maxLength,
  onFocus,
  onBlur,
}) => {
  const { theme } = useTheme();
  const t = tc(theme);

  return (
    <div
      className={clsx(
        "w-full",
        !fullWidth && !width ? "max-w-md" : "",
        width && !fullWidth && width,
        className
      )}
    >
      {label && (
        <label className={clsx("block mb-1 text-sm font-semibold", t.text)}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={clsx(
          "relative w-full rounded-xl border transition-all duration-200 shadow-sm",
          error ? "border-red-500" : t.border,
          disabled ? t.input : t.card,
          "focus-within:ring-2 focus-within:ring-indigo-500"
        )}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          step={step}
          maxLength={maxLength}
          className={clsx(
            "w-full py-2.5 pl-4 pr-10 text-sm placeholder-gray-400 border-none focus:ring-0 focus:outline-none rounded-xl",
            disabled ? t.disabledInput : t.input,
            inputClassName
          )}
        />
        {error && (
          <ExclamationCircleIcon
            className={clsx(
              "absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2",
              theme === "dark" ? "text-red-400" : "text-red-500"
            )}
          />
        )}
      </div>

      {error && (
        <div
          className={clsx(
            "mt-1 flex items-center text-sm",
            theme === "dark" ? "text-red-400" : "text-red-600"
          )}
        >
          <ExclamationCircleIcon className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default TextField;

// import React from "react";
// import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
// import clsx from "clsx";
// import { useTheme } from "../../contexts/ThemeContext";
// import { themeClasses as tc } from "../ThemeClasses";

// interface TextFieldProps {
//   label?: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   placeholder?: string;
//   type?: string;
//   disabled?: boolean;
//   error?: string;
//   fullWidth?: boolean;
//   width?: string;
//   className?: string;
//   inputClassName?: string;
//   required?: boolean;
//   min?: number;
//   max?: number;
//   step?: string;
//   maxLength?: number;
// }

// const TextField: React.FC<TextFieldProps> = ({
//   label,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
//   disabled = false,
//   error,
//   fullWidth = false,
//   width = "",
//   className = "",
//   inputClassName = "",
//   required = false,
//   min,
//   max,
//   step,
//   maxLength,
// }) => {
//   const { theme } = useTheme();
//   const t = tc(theme);

//   return (
//     <div
//       className={clsx(
//         "w-full",
//         !fullWidth && !width ? "max-w-md" : "",
//         width && !fullWidth && width,
//         className
//       )}
//     >
//       {label && (
//         <label className={clsx("block mb-1 text-sm font-semibold", t.text)}>
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}

//       <div
//         className={clsx(
//           "relative w-full rounded-xl border transition-all duration-200 shadow-sm",
//           error ? "border-red-500" : t.border,
//           disabled ? t.input : t.card,
//           "focus-within:ring-2 focus-within:ring-indigo-500"
//         )}
//       >
//         <input
//           type={type}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           disabled={disabled}
//           required={required}
//           min={min}
//           max={max}
//           step={step}
//           maxLength={maxLength}
//           className={clsx(
//             "w-full py-2.5 pl-4 pr-10 text-sm placeholder-gray-400 border-none focus:ring-0 focus:outline-none rounded-xl",
//             t.input,
//             inputClassName
//           )}
//         />
//         {error && (
//           <ExclamationCircleIcon
//             className={clsx(
//               "absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2",
//               theme === "dark" ? "text-red-400" : "text-red-500"
//             )}
//           />
//         )}
//       </div>

//       {error && (
//         <div
//           className={clsx(
//             "mt-1 flex items-center text-sm",
//             theme === "dark" ? "text-red-400" : "text-red-600"
//           )}
//         >
//           <ExclamationCircleIcon className="h-4 w-4 mr-1" />
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TextField;
