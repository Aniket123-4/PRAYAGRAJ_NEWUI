import React, { useState, useRef, useEffect } from 'react';
import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiAlignLeft,
  FiAlignRight,
  FiAlignCenter
} from 'react-icons/fi';
import { FaListOl } from 'react-icons/fa'; // For numbered list icon

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  theme?: 'light' | 'dark';
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content here...',
  className = '',
  theme = 'light',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [lastHtml, setLastHtml] = useState(value);

  // Set initial value on mount/update
 useEffect(() => {
  if (editorRef.current && value !== lastHtml) {
    editorRef.current.innerHTML = value;
    setLastHtml(value);
  }
}, [value]);


const handleInput = () => {
  if (editorRef.current) {
    let html = editorRef.current.innerHTML;

    // Fix: Remove <p><ul> or <p><ol> wrapping
    html = html.replace(/<p>(\s*)(<(ul|ol)[\s\S]*?<\/\3>)(\s*)<\/p>/gi, '$2');

    onChange(html);
    setLastHtml(html);
  }
};


 const formatText = (command: string, value?: string) => {
  if (!editorRef.current) return;

  // Force focus to ensure selection stays within editor
  editorRef.current.focus();

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const isInsideEditor = editorRef.current.contains(range.commonAncestorContainer);
  if (!isInsideEditor) return;

  // Some browsers require this wrapped in a timeout
  setTimeout(() => {
    const success = document.execCommand(command, false, value);
    if (!success) {
      console.warn(`Command "${command}" failed or is blocked.`);
    }
    handleInput(); // Update state after formatting
  }, 0);
};


  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '\t');
    }
  };

  const bgColor = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const borderColor = isFocused
    ? (theme === 'dark' ? 'border-blue-500' : 'border-blue-400')
    : (theme === 'dark' ? 'border-gray-600' : 'border-gray-300');
  const hoverBg = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200';

  return (
    <div className={`relative border rounded-md ${borderColor} ${className}`}>
      {/* Toolbar */}
      <div className={`flex flex-wrap items-center p-1 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        <button type="button" onClick={() => formatText('bold')} className={`p-2 rounded ${hoverBg}`} title="Bold">
          <FiBold />
        </button>
        <button type="button" onClick={() => formatText('italic')} className={`p-2 rounded ${hoverBg}`} title="Italic">
          <FiItalic />
        </button>
        <button type="button" onClick={() => formatText('underline')} className={`p-2 rounded ${hoverBg}`} title="Underline">
          <FiUnderline />
        </button>

        <div className="border-l h-6 mx-1 border-gray-400"></div>

        <button type="button" onClick={() => formatText('insertUnorderedList')} className={`p-2 rounded ${hoverBg}`} title="Bullet List">
          <FiList />
        </button>
        <button type="button" onClick={() => formatText('insertOrderedList')} className={`p-2 rounded ${hoverBg}`} title="Numbered List">
          <FaListOl />
        </button>

        <div className="border-l h-6 mx-1 border-gray-400"></div>

        <button type="button" onClick={() => formatText('justifyLeft')} className={`p-2 rounded ${hoverBg}`} title="Align Left">
          <FiAlignLeft />
        </button>
        <button type="button" onClick={() => formatText('justifyCenter')} className={`p-2 rounded ${hoverBg}`} title="Align Center">
          <FiAlignCenter />
        </button>
        <button type="button" onClick={() => formatText('justifyRight')} className={`p-2 rounded ${hoverBg}`} title="Align Right">
          <FiAlignRight />
        </button>
      </div>

      {/* Placeholder */}
      {!value && !isFocused && (
        <div className="absolute top-[52px] left-3 text-gray-400 pointer-events-none select-none">
          {placeholder}
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        className={`${bgColor} min-h-[200px] p-3 outline-none overflow-auto`}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        suppressContentEditableWarning
      />
    </div>
  );
};

export default RichTextEditor;
