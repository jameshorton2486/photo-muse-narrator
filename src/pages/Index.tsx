import * as React from 'react';
import type { SeoMetadata, ProductDescription } from '@/types/product';
import UploadZone from '@/components/UploadZone';
import ProductDetailsForm from '@/components/ProductDetailsForm';
import { ReviewModal } from '@/components/ReviewModal';
import { generateDescription } from '@/services/descriptionGenerator';
import { Button } from "@/components/ui/button";
import { ExportData } from '@/utils/exportUtils';
import { generateCSVContent } from '@/utils/exportUtils';
import { useToast } from "@/hooks/use-toast";
import { Copy, Download } from 'lucide-react';

export default function Index() {
  const [images, setImages] = React.useState<any[]>([]);
  const [formData, setFormData] = React.useState<any>(null);
  const [description, setDescription] = React.useState<ProductDescription | null>(null);
  const [seoMetadata, setSeoMetadata] = React.useState<SeoMetadata | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (data: any) => {
    setFormData(data);
    try {
      const apiKey = process.env.NEXT_PUBLIC_CLAUDE_API_KEY;
      if (!apiKey) {
        throw new Error('Claude API key is not set. Please set the NEXT_PUBLIC_CLAUDE_API_KEY environment variable.');
      }
      const generatedContent = await generateDescription({ formData: data, images: images }, apiKey);
      setDescription(generatedContent.description);
      setSeoMetadata(generatedContent.seoMetadata);
      setIsReviewModalOpen(true);
    } catch (error: any) {
      console.error("Error generating description:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate description",
        variant: "destructive",
      });
    }
  };

  const handleImagesUploaded = (images: any[]) => {
    setImages(images);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleExportCSV = () => {
    if (!description || !seoMetadata) {
      toast({
        title: "Error",
        description: "Description not generated yet.",
        variant: "destructive",
      });
      return;
    }

    const exportData: ExportData = {
      productDescription: description,
      seoMetadata: seoMetadata,
      images: images.map(img => img.url)
    };

    const csvContent = generateCSVContent(exportData);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${seoMetadata.slug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "CSV Download Started",
      description: "Your CSV file will be downloaded shortly.",
    });
  };

  const handleCopyToClipboard = async () => {
    if (!description) {
      toast({
        title: "Error",
        description: "Description not generated yet.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(description.description.join('\n\n'));
      toast({
        title: "Copied!",
        description: "Description copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy description",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Kollect-It</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="shadow-md rounded-md border p-4">
          <h2 className="text-xl font-semibold mb-4">1. Upload Images</h2>
          <UploadZone onImagesUploaded={handleImagesUploaded} />
        </div>

        <div className="shadow-md rounded-md border p-4">
          <h2 className="text-xl font-semibold mb-4">2. Enter Product Details</h2>
          <ProductDetailsForm onSubmit={handleFormSubmit} />
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Button onClick={handleCopyToClipboard} disabled={!description}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Description
        </Button>
        <Button variant="secondary" onClick={handleExportCSV} disabled={!description || !seoMetadata}>
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      <ReviewModal
        open={isReviewModalOpen}
        onOpenChange={handleCloseReviewModal}
        description={description}
      />
      <Toaster />
    </div>
  );
}
