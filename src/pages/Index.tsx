
import React from 'react';
import UploadZone from '@/components/UploadZone';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-8">
      <h1 className="text-3xl font-medium text-slate-800 mb-12 font-inter">
        Description Generator
      </h1>
      <UploadZone />
    </div>
  );
};

export default Index;
