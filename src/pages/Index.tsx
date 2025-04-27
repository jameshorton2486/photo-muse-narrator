import * as React from 'react';
import type { SeoMetadata } from '@/types/product';
import UploadZone from '@/components/UploadZone';
import Toolbar from '@/components/Toolbar';
import ReviewModal from '@/components/ReviewModal';
import ComparisonView from '@/components/ComparisonView';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import { generateDescription } from '@/services/descriptionGenerator';
import type { ProductDescription } from '@/services/descriptionGenerator';
import SeoPreview from '@/components/SeoPreview';

export default function Index() {
  const [isReviewOpen, setIsReviewOpen] = React.useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = React.useState(false);
  const [description, setDescription] = React.useState<ProductDescription | null>(null);
  const [enhancedDescription, setEnhancedDescription] = React.useState<ProductDescription | null>(null);
  const [showDiagram, setShowDiagram] = React.useState(true);
  const [seoMetadata, setSeoMetadata] = React.useState<SeoMetadata | null>(null);

  const handleClearAll = () => {
    setDescription(null);
    setEnhancedDescription(null);
    setIsReviewOpen(false);
    setIsComparisonOpen(false);
  };

  const handleGenerateDescription = async () => {
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

    const { description, seoMetadata } = await generateDescription(mockPayload);
    setDescription(description);
    setSeoMetadata(seoMetadata);
    setIsReviewOpen(true);
  };

  const handleEnhanceDescription = async () => {
    setIsReviewOpen(false);
    setIsComparisonOpen(true);
    
    setTimeout(() => {
      if (description) {
        setEnhancedDescription({
          ...description,
          description: [
            ...description.description,
            "Enhanced with more collector-specific details and SEO-optimized content.",
          ],
          additionalDetails: description.additionalDetails + "\n\nEnhanced with premium market insights.",
        });
      }
    }, 1500);
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
          description={description}
        />
      </div>
      
      {showDiagram ? (
        <div className="w-full max-w-4xl mx-auto mb-8">
          <WorkflowDiagram />
          <div className="text-center mt-8">
            <button 
              onClick={() => setShowDiagram(false)}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Start Using Kollect-It
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <UploadZone />
          {seoMetadata && <SeoPreview metadata={seoMetadata} />}
        </div>
      )}

      {description && (
        <>
          <ReviewModal
            description={description}
            isOpen={isReviewOpen}
            onOpenChange={setIsReviewOpen}
            onAccept={handleEnhanceDescription}
            onStartOver={handleClearAll}
          />

          <ComparisonView
            originalDescription={description}
            enhancedDescription={enhancedDescription}
            isOpen={isComparisonOpen}
            onOpenChange={setIsComparisonOpen}
            onAccept={() => {
              setDescription(enhancedDescription);
              setIsComparisonOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
}
