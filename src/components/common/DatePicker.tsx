import React, { useState, useEffect, useRef } from 'react';
import { format, isDate, isValid } from 'date-fns';
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";

interface DatePickerProps {
  selected: Date | string | null | undefined;
  onChange: (date: string) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  isClearable?: boolean;
  required?: boolean;
  error?: string;
  minDate?: string;
  maxDate?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  label,
  className = '',
  placeholder = 'Select date',
  isClearable = false,
  required = false,
  error,
  minDate,
  maxDate,
}) => {
  const { theme } = useTheme();
  const t = tc(theme);
  const [, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const datePickerRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    try {
      if (!selected) { setInputValue(''); return; }
      const date = isDate(selected) ? selected : new Date(selected as string);
      setInputValue(isValid(date) ? format(date, 'yyyy-MM-dd') : '');
    } catch { setInputValue(''); }
  }, [selected]);

  useEffect(() => {
    const outsideClick = (e: MouseEvent) =>
      datePickerRef.current && !datePickerRef.current.contains(e.target as Node) && setIsOpen(false);
    document.addEventListener('mousedown', outsideClick);
    return () => document.removeEventListener('mousedown', outsideClick);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(val) && isValid(new Date(val))) onChange(val);
  };
 

  const handleClear = () => { onChange(''); setInputValue(''); };

  return (
    <div className={`relative ${className}`} ref={datePickerRef}>
      {label && (
        <label className={`block text-sm font-medium mb-1 ${t.text}`}>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <div className="relative">
        <input
          type="date"
          value={inputValue}
          onChange={handleDateChange}
          min={minDate}
          max={maxDate}
          placeholder={placeholder}
          className={`w-full pl-3 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${error ? 'border-red-500' : t.border}
            ${t.input}`}
        />

        {isClearable && inputValue && (
          <button
            type="button"
            className={`absolute inset-y-0 right-7 flex items-center pr-3 transition-colors ${t.subText} hover:${t.text}`}
            onClick={handleClear}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {error && <p className={`mt-1 text-sm ${t.text} text-red-600`}>{error}</p>}
    </div>
  );
};

export default DatePicker;