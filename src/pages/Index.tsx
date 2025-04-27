
import * as React from 'react';
import UploadZone from '@/components/UploadZone';

export default function Index() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-8 font-sans min-w-[1200px]">
      <h1 className="text-3xl font-medium text-slate-800 mb-12">
        Description Generator
      </h1>
      <UploadZone />
    </div>
  );
}
