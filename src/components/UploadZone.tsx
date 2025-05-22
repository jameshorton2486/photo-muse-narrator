
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DescriptionPayload } from '@/types/product';
import ProductDetailsForm from './ProductDetailsForm';

interface UploadZoneProps {
  onImagesUploaded: (images: File[]) => void;
}

export default function UploadZone({ onImagesUploaded }: UploadZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
    onImagesUploaded(acceptedFiles);
  }, [onImagesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png']
    }
  });

  const handleGenerateDescription = (payload: DescriptionPayload) => {
    console.log('Generated payload:', payload);
    // This will be connected to the AI processing step in the next phase
  };

  React.useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 font-['Inter']">
      <div
        {...getRootProps()}
        className={cn(
          "relative w-full h-64 border-2 border-dashed rounded-lg transition-all duration-300",
          "hover:border-blue-400 hover:bg-blue-50/50",
          isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-200",
          "cursor-pointer"
        )}
      >
        <input {...getInputProps()} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 text-blue-400 mb-4" />
          <p className="text-lg text-slate-600 mb-2">
            Drop your product images here
          </p>
          <p className="text-sm text-slate-400">
            or click to browse
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4 bg-white p-6 rounded-lg border border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800">Uploaded Photos</h2>
          <div className="grid grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div key={file.name + index} className="group">
                <div className="aspect-square rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-sm text-slate-500 truncate">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-slate-100">
        <ProductDetailsForm 
          images={files}
          onGenerateDescription={handleGenerateDescription}
        />
      </div>
    </div>
  );
}
