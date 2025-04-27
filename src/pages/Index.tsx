
import * as React from 'react';
import UploadZone from '@/components/UploadZone';
import Toolbar from '@/components/Toolbar';

export default function Index() {
  const handleClearAll = () => {
    // This is a placeholder for global clear action
    console.log('Clear all triggered from global toolbar');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-8 font-sans min-w-[1200px]">
      <h1 className="text-3xl font-medium text-slate-800 mb-12">
        Description Generator
      </h1>
      
      {/* Global Toolbar - Places the toolbar above the upload zone as requested */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <Toolbar onClearAll={handleClearAll} />
      </div>
      
      <UploadZone />
    </div>
  );
}
