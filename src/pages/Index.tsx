import * as React from 'react';
import type { SeoMetadata, ProductDescription } from '@/types/product';
import UploadZone from '@/components/UploadZone';
import Toolbar from '@/components/Toolbar';
import ReviewModal from '@/components/ReviewModal';
import ComparisonView from '@/components/ComparisonView';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import { generateDescription, GeneratedContent } from '@/services/descriptionGenerator';
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
    setSeoMetadata(null);
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

    try {
      const { description, seoMetadata } = await generateDescription(mockPayload, "mock-api-key");
      setDescription(description);
      setSeoMetadata(seoMetadata);
      setIsReviewOpen(true);
    } catch (error) {
      console.error("Error generating description:", error);
      const mockDescription: ProductDescription = {
        title: "Victorian Walnut Side Chair, Circa 1880",
        details: {
          category: "Antique Furniture",
          originPeriod: "Victorian, England",
          age: "Circa 1880",
          materials: "Walnut, original upholstery",
          dimensions: "H: 37\", W: 20\", D: 18\"",
          condition: "Very Good",
          itemNumber: "00123-VICTORIAN-CHAIR",
          price: "1200"
        },
        description: [
          "This elegant Victorian side chair exemplifies the refined craftsmanship of late 19th century furniture making.",
          "Featuring a solid walnut frame with original finish, the chair displays beautifully carved details including scrollwork along the top rail and delicate floral motifs on the legs.",
          "The seat retains what appears to be its original upholstery, a remarkable find for a piece of this age."
        ],
        distinguishingCharacteristics: [
          "Hand-carved scroll detailing on back and arms",
          "Original walnut finish with warm patina",
          "Period-appropriate upholstery techniques",
          "Mortise and tenon joinery throughout",
          "Brass casters with original finish"
        ],
        conditionReport: "Overall excellent condition for age. The walnut frame is solid with no repairs or breaks. Original finish shows expected patina and minor surface scratches consistent with age. Upholstery shows minimal wear with no tears or staining.",
        provenanceHistory: "From the estate collection of the Henderson family, Baltimore. According to family records, the chair was purchased in 1885 from a prominent London furniture maker and has remained in the family since then.",
        collectorValue: "Victorian walnut chairs of this quality have shown steady appreciation in the collectors' market. Similar examples have sold at auction for $1,200 to $1,800 in the past two years.",
        additionalDetails: "This chair is part of a larger dining set that included 12 chairs and a matching table. The set was separated in the 1960s, making individual pieces like this one particularly desirable for collectors looking to recreate a Victorian dining room setting.",
        shippingHandling: "Professionally packed and shipped with full insurance. White glove delivery available at additional cost. Please contact us for international shipping quotes."
      };
      
      const mockSeo: SeoMetadata = {
        seoTitle: "Victorian Walnut Side Chair - Antique Furniture",
        metaDescription: "Elegant Victorian walnut side chair featuring hand-carved detail, circa 1880.",
        slug: "victorian-walnut-side-chair-1880",
        tags: ["Victorian", "Carved Walnut", "Antique Chair", "19th Century", "Collectible"],
        imageAltTexts: {
          "victorian-chair-front.jpg": "Front view of Victorian walnut carved side chair",
          "victorian-chair-side.jpg": "Side profile showing hand-carved scroll arm of Victorian chair"
        }
      };
      
      setDescription(mockDescription);
      setSeoMetadata(mockSeo);
      setIsReviewOpen(true);
    }
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
          seoMetadata={seoMetadata}
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
              if (enhancedDescription) {
                setDescription(enhancedDescription);
              }
              setIsComparisonOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
}
