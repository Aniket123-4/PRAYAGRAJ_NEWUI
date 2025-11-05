import { FiX } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';


export const useThemeClasses = () => {
  const { theme } = useTheme();
  
  return {
    dropdown: theme === 'dark' 
      ? 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700' 
      : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50',
    dropdownItem: theme === 'dark'
      ? 'hover:bg-gray-700 text-white'
      : 'hover:bg-gray-100 text-gray-800',
    background: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    text: theme === 'dark' ? 'text-white' : 'text-gray-800',
    subText: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    input: theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500' 
      : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500',
    tableHeader: theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-blue-900 text-white',
    tableRow: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    tableRowHover: theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
    button: {
      primary: theme === 'dark' 
        ? 'bg-blue-700 text-white' 
        : 'bg-blue-900 text-white',
      primaryHover: theme === 'dark' 
        ? 'hover:bg-blue-800' 
        : 'hover:bg-blue-950',
      secondary: theme === 'dark' 
        ? 'bg-gray-700 text-white' 
        : 'bg-gray-100 text-gray-700',
      secondaryHover: theme === 'dark' 
        ? 'hover:bg-gray-600' 
        : 'hover:bg-gray-200',
      danger: theme === 'dark' 
        ? 'bg-red-700 text-white' 
        : 'bg-red-600 text-white',
      dangerHover: theme === 'dark' 
        ? 'hover:bg-red-800' 
        : 'hover:bg-red-700'
    },
    modal: theme === 'dark' 
      ? 'bg-gray-800 text-white' 
      : 'bg-white text-gray-800',
    card: theme === 'dark' 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200'
  };
};

export const useToastOptions = () => {
  const { theme } = useTheme();
  return {
    position: "top-right" as const,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: theme === 'dark' ? 'dark' : 'light',
    className: `${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-md shadow-lg`,
    progressClassName: theme === 'dark' ? 'bg-indigo-400' : 'bg-indigo-600',
  };
};

export const ThemeButton = ({ 
  type = 'primary', 
  children, 
  onClick, 
  className = '',
  disabled = false,
  submit = false
}: {
  type?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  submit?: boolean;
}) => {
  const themeClasses = useThemeClasses();
  
  const buttonClasses = {
    primary: themeClasses.button.primary,
    secondary: themeClasses.button.secondary,
    danger: themeClasses.button.danger
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={submit ? 'submit' : 'button'}
      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${buttonClasses[type]} ${className}`}
    >
      {children}
    </button>
  );
};

export const ThemeInput = (props: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) => {
  const themeClasses = useThemeClasses();
  
  return (
    <div>
      <input
        {...props}
        className={`w-full border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.input} ${themeClasses.border}`}
      />
      {props.error && (
        <div className="text-red-500 text-xs mt-1">{props.error}</div>
      )}
    </div>
  );
};

export const ThemeCard = ({ 
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const themeClasses = useThemeClasses();
  
  return (
    <div className={`rounded-lg border ${themeClasses.card} ${themeClasses.border} ${className}`}>
      {children}
    </div>
  );
};

export const ThemeTable = (props: {
  headers: string[];
  children: React.ReactNode;
  emptyMessage?: string;
}) => {
  const themeClasses = useThemeClasses();
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className={themeClasses.tableHeader}>
          <tr>
            {props.headers.map((header, index) => (
              <th key={index} className="text-left px-2 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.children || (
            <tr>
              <td colSpan={props.headers.length} className={`text-center px-2 py-4 ${themeClasses.subText}`}>
                {props.emptyMessage || 'No data available'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export const ThemeModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  const themeClasses = useThemeClasses();
  
  if (!props.isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={props.onClose}
      ></div>

      <div className={`relative z-10 rounded-lg p-3 w-full max-w-sm shadow-xl mx-2 ${themeClasses.modal} ${themeClasses.border}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-lg font-medium">
            {props.title}
          </div>
          <button
            onClick={props.onClose}
            className={themeClasses.subText}
          >
            <FiX size={18} />
          </button>
        </div>

        <div className={`border-t mb-3 ${themeClasses.border}`} />

        {props.children}
      </div>
    </div>
  );
};