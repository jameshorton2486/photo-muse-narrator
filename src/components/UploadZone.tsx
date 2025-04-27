
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Edit, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const UploadZone = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png']
    }
  });

  React.useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleClearAll = () => {
    setFiles([]);
    setPreviews(prev => {
      prev.forEach(preview => URL.revokeObjectURL(preview));
      return [];
    });
  };

  const Toolbar = () => (
    <div className="sticky top-0 bg-white/80 backdrop-blur-sm py-4 border-b z-10 shadow-sm mb-8">
      <div className="flex gap-3 justify-start">
        <Button
          variant="default"
          className="bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold tracking-wide px-6 py-2 text-base transition-all duration-300 shadow-md rounded-lg flex items-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Generate Description
        </Button>
        <Button
          variant="secondary"
          className="bg-[#E5E7EB] text-[#374151] hover:bg-[#D1D5DB] transition-colors duration-300 shadow-sm rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit Description
        </Button>
        <Button
          variant="secondary"
          onClick={handleClearAll}
          className="bg-[#E5E7EB] text-[#374151] hover:bg-[#D1D5DB] transition-colors duration-300 shadow-sm rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Clear All
        </Button>
        <Button
          variant="secondary"
          className="bg-[#E5E7EB] text-[#374151] hover:bg-[#D1D5DB] transition-colors duration-300 shadow-sm rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {files.length > 0 && <Toolbar />}
      
      <div className="p-6">
        <div
          {...getRootProps()}
          className={cn(
            "relative w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center",
            "hover:border-slate-400 hover:bg-slate-50",
            isDragActive ? "border-blue-400 bg-blue-50" : "border-slate-200",
            "cursor-pointer"
          )}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-slate-400 mb-4" />
          <p className="text-lg text-slate-600 mb-2">
            Drop your images here or browse to upload
          </p>
          <Button
            variant="secondary"
            className="mt-4 bg-white hover:bg-slate-100"
            onClick={(e) => {
              e.stopPropagation();
              const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
              if (fileInput) fileInput.click();
            }}
          >
            Browse Files
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4 p-6">
          <h2 className="text-xl font-semibold text-slate-800">Uploaded Photos</h2>
          <div className="grid grid-cols-3 gap-6">
            {files.map((file, index) => (
              <div key={file.name + index} className="group">
                <div className="aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm text-slate-600 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
