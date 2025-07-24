import React, { useState, useRef } from 'react';
import Button from './Button';
import { PaperclipIcon, XCircleIcon, CheckCircleIcon } from 'lucide-react';

interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onChange: (files: File[]) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Cargar archivo',
  accept = '.pdf,.jpg,.jpeg,.png',
  multiple = false,
  maxSize = 5, // 5MB default
  onChange,
  error,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const filesArray = Array.from(fileList);
    const newErrors: { [key: string]: string } = {};
    const validFiles: File[] = [];

    filesArray.forEach(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        newErrors[file.name] = `El archivo excede el tamaño máximo de ${maxSize}MB`;
      } else {
        validFiles.push(file);
      }
    });

    setFileErrors(newErrors);
    
    if (validFiles.length > 0) {
      const newFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles;
      setSelectedFiles(newFiles);
      onChange(newFiles);
    }
  };

  const removeFile = (fileName: string) => {
    const updatedFiles = selectedFiles.filter(file => file.name !== fileName);
    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);
    
    // Remove any errors for this file
    const { [fileName]: _, ...remainingErrors } = fileErrors;
    setFileErrors(remainingErrors);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex flex-col">
        <div 
          className={`
            border-2 border-dashed rounded-md p-4 text-center cursor-pointer
            transition-colors duration-200 hover:bg-gray-50
            ${error ? 'border-red-400' : 'border-gray-300'}
          `}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
          />
          <PaperclipIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            Haga clic para seleccionar {multiple ? 'archivos' : 'un archivo'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Formatos aceptados: {accept.replace(/\./g, '').replace(/,/g, ', ')}
          </p>
          <p className="text-xs text-gray-400">
            Tamaño máximo: {maxSize}MB
          </p>
        </div>
        
        {selectedFiles.length > 0 && (
          <ul className="mt-3 space-y-2">
            {selectedFiles.map((file, index) => (
              <li 
                key={`${file.name}-${index}`} 
                className={`
                  flex items-center justify-between p-2 rounded-md
                  ${fileErrors[file.name] ? 'bg-red-50' : 'bg-gray-50'}
                `}
              >
                <div className="flex items-center">
                  {fileErrors[file.name] ? (
                    <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                  ) : (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  )}
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    {fileErrors[file.name] && (
                      <p className="text-xs text-red-500">{fileErrors[file.name]}</p>
                    )}
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                >
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
        )}
        
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default FileUpload;