import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FiUpload, FiX, FiFile } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';
import { themeClasses as tc } from '../../components/ThemeClasses';

interface FileUploadProps {
  label?: string;
  onFileSelect: (file: File | null) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  disabled?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  onFileSelect,
  acceptedTypes = '.pdf,.jpg,.jpeg,.png,.doc,.docx',
  maxSize = 5,
  disabled = false,
  className = '',
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const th = tc(theme);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setError(t('text.noFileSelected'));
      return;
    }

    // Check file type
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = acceptedTypes.split(',').map(ext => ext.replace('.', '').trim());

    if (fileExtension && !acceptedExtensions.includes(fileExtension)) {
      setError(t('text.invalidFileType', { types: acceptedTypes }));
      return;
    }

    // Check file size (convert MB to bytes)
    if (maxSize && selectedFile.size > maxSize * 1024 * 1024) {
      setError(t('text.fileTooLarge', { maxSize }));
      return;
    }

    setError(null);
    setFile(selectedFile);
    onFileSelect(selectedFile);

    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  }, [acceptedTypes, maxSize, onFileSelect, t]);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
    setError(null);
  }, [onFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`${className} ${disabled ? 'opacity-50' : ''}`}>
      {label && (
        <label className={`block text-sm font-medium mb-2 ${th.text}`}>
          {label}
        </label>
      )}

      <div className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${th.border} hover:${th.hoverBg}`}>
        <input
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={disabled}
        />

        {!file ? (
          <label
            htmlFor="file-upload"
            className={`cursor-pointer flex flex-col items-center justify-center space-y-2 ${th.text}`}
          >
            <FiUpload className="w-8 h-8" />
            <div>
              <span className="font-medium">{t('text.clickToUpload')}</span>
              <span className={`block text-sm ${th.subText}`}>
                {t('text.supportedFormats')}: {acceptedTypes} ({t('text.maxSize')}: {maxSize}MB)
              </span>
            </div>
          </label>
        ) : (
          <div className="flex flex-col items-center">
            {previewUrl ? (
              <div className="mb-2">
                <img
                  src={previewUrl}
                  alt={file.name}
                  className="max-h-32 max-w-full rounded"
                />
              </div>
            ) : (
              <div className="flex items-center mb-2">
                <FiFile className="w-8 h-8 mr-2" />
                <div className="text-left">
                  <p className={`font-medium truncate max-w-xs ${th.text}`}>{file.name}</p>
                  <p className={`text-sm ${th.subText}`}>{formatFileSize(file.size)}</p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleRemoveFile}
              className={`flex items-center text-sm ${th.text} hover:${th.hoverText}`}
              disabled={disabled}
            >
              <FiX className="mr-1" />
              {t('text.removeFile')}
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className={`mt-1 text-sm text-red-600 dark:text-red-400`}>{error}</p>
      )}
    </div>
  );
};

export default FileUpload;