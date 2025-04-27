
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductDetailsForm from './ProductDetailsForm';

export default function UploadZone() {
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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-sm">
      <div
        {...getRootProps()}
        className={cn(
          "relative w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center",
          "hover:border-slate-400 hover:bg-slate-50",
          isDragActive ? "border-blue-400 bg-blue-50" : "border-slate-200",
          "cursor-pointer mb-8"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-slate-400 mb-4" />
        <p className="text-lg text-slate-600 mb-2">
          Drop your images here or browse to upload
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-800">Uploaded Photos</h2>
          <div className="grid grid-cols-3 gap-6">
            {files.map((file, index) => (
              <div key={file.name + index} className="group">
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

      <div className="pt-8 border-t">
        <ProductDetailsForm />
      </div>
    </div>
  );
}
