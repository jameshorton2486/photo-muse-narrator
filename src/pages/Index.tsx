
import * as React from 'react';
import UploadZone from '@/components/UploadZone';
import Toolbar from '@/components/Toolbar';
import ReviewModal from '@/components/ReviewModal';
import { generateDescription } from '@/services/descriptionGenerator';
import type { ProductDescription } from '@/services/descriptionGenerator';

export default function Index() {
  const [isReviewOpen, setIsReviewOpen] = React.useState(false);
  const [description, setDescription] = React.useState<ProductDescription | null>(null);

  const handleClearAll = () => {
    setDescription(null);
    setIsReviewOpen(false);
  };

  const handleGenerateDescription = async () => {
    // This will be replaced with real data from the form
    const mockPayload = {
      formData: {
        title: "Sample Product",
        category: "Antiques",
        details: "Sample details",
        dimensions: {
          height: "10",
          width: "10",
          depth: "10"
        },
        materials: "Wood",
        era: "Victorian",
        price: "1000",
        itemNumber: "12345"
      },
      images: []
    };

    const generatedDescription = await generateDescription(mockPayload);
    setDescription(generatedDescription);
    setIsReviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center p-8 font-sans min-w-[1200px]">
      <h1 className="text-3xl font-medium text-slate-800 mb-12">
        Kollect-It Description Generator
      </h1>
      
      <div className="w-full max-w-4xl mx-auto mb-8">
        <Toolbar 
          onClearAll={handleClearAll}
          onGenerateDescription={handleGenerateDescription} 
        />
      </div>
      
      <UploadZone />

      {description && (
        <ReviewModal
          description={description}
          isOpen={isReviewOpen}
          onOpenChange={setIsReviewOpen}
          onAccept={() => {
            // Handle accepting the description
            setIsReviewOpen(false);
          }}
          onStartOver={handleClearAll}
        />
      )}
    </div>
  );
}
