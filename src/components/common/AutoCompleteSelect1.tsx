
import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext';
import { themeClasses as tc } from '../../components/ThemeClasses';
import { Combobox } from '@headlessui/react';
export interface Option {
  id: string | number;
  label: string;
  value: string | number;
}

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
interface AutoCompleteSelectProps {
label?: string;
options: Option[];
selected: Option | null;
onChange: (value: Option) => void;
placeholder?: string;
disabled?: boolean;
error?: any;
fullWidth?: boolean;
required?: boolean;
}

const AutoCompleteSelect1: React.FC<AutoCompleteSelectProps> = ({
    label,
    options,
    selected,
    onChange,
    placeholder = "Select...",
    disabled = false,
    error,
    fullWidth = false,
    required = false,

})=> {

    const { theme} =useTheme();
    const t =tc(theme);
    const [query,setQuery]=useState("");
    const [open, setOpen]= useState(false);
    const wrapperRef =useRef<HTMLDivElement>(null);

    const filteredOptions =
    query===""
    ?options.slice(0,50)
    :options.filter((option)=>
    option.label.toLowerCase().includes(query.toLowerCase())
    ).slice(0,50);

    useEffect(()=>{
        const handleClickOutside=(e:MouseEvent | FocusEvent)=>{
            if(
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            )
            {
                setOpen(false)
            }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleClickOutside);   
    return()=>{
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("focusin", handleClickOutside);
    };
    },[]);

  return (
    <div className={`w-full ${!fullWidth ? "max-w-md" : ""  }`}>
        {label && (
            <label className={`block mb-1 font-medium ${disabled ? "text-gray-400" : t.text}`}>
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}

        <Combobox value={selected}
         onChange={(value:any)=>{
            onChange(value);
            setQuery("");
            setOpen(false); 
         }} 
        disabled={disabled}
        as={"div"}>
<div className="relative" ref={wrapperRef}
onKeyDown={(e)=>{
    if(e.key==="Tab"){
        setOpen(false);
    }
}}>
       <div
                className={`relative w-full cursor-default overflow-hidden rounded-xl border transition-all duration-200 shadow-sm
                  ${error ? "border-red-500" : t.border}
                  ${disabled ? t.input : t.card}
                  focus-within:ring-2 focus-within:ring-indigo-500`}
                onClick={() => setOpen(true)}
              >
                <Combobox.Input
                  className={`w-full border-none py-2.5 pl-4 pr-10 text-sm placeholder-gray-400 focus:ring-0 focus:outline-none ${t.input}`}
                  displayValue={(option: Option) => option?.label ?? ""}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  placeholder={placeholder}
                />
                <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
                  {(query || selected) && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        onChange({ id: "", label: "", value: "" });
                        setOpen(false);
                      }}
                    >
                      <XMarkIcon className={`h-4 w-4 ${t.subText}`} />
                    </button>
                  )}
                  <Combobox.Button onClick={() => setOpen(true)}>
                    {open ? (
                      <ChevronUpIcon className={`h-5 w-5 ${t.subText}`} />
                    ) : (
                      <ChevronDownIcon className={`h-5 w-5 ${t.subText}`} />
                    )}
                  </Combobox.Button>
                </div>
              </div>
    
              {open && (
                <Combobox.Options
                  static
                  className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${t.dropdownBg} ${t.border}`}
                >
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <Combobox.Option
                        key={option.id}
                        value={option}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? t.activeBg : t.dropdownText
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-semibold" : "font-normal"
                              } ${t.dropdownText}`}
                            >
                              {option.label}
                            </span>
                            {selected && (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-indigo-400"
                                }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  ) : (
                    <div className={`px-4 py-2 text-sm italic ${t.subText}`}>
                      No results found.
                    </div>
                  )}
                </Combobox.Options>
              )}
            </div>
    
            {error && (
              <div className={`mt-1 flex items-center text-sm text-red-600`}>
                <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
          </Combobox>
      
    </div>
  )
}

export default AutoCompleteSelect1
