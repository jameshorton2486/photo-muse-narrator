
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const UploadZone = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    // Create image previews
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png']
    }
  });

  // Cleanup previews when component unmounts
  React.useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
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

      {files.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Uploaded Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div key={file.name + index} className="group relative">
                <div className="aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
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
