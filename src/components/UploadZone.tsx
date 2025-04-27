
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const UploadZone = () => {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Dropped files:', acceptedFiles);
    // Handle the uploaded files here
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png']
    }
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
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
            document.querySelector('input[type="file"]')?.click();
          }}
        >
          Browse Files
        </Button>
      </div>
    </div>
  );
};

export default UploadZone;
