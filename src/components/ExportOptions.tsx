
import * as React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from './ui/button';
import type { ProductDescription, SeoMetadata } from '@/types/product';
import { generateCSVContent, generateHTMLContent, generatePlainTextContent } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast';

interface ExportOptionsProps {
  productDescription: ProductDescription | null;
  seoMetadata?: SeoMetadata | null;
  images?: string[];
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ 
  productDescription, 
  seoMetadata = null, 
  images = [] 
}) => {
  const { toast } = useToast();

  const downloadFile = (content: string, filename: string, contentType: string) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();

    toast({
      title: "Export successful",
      description: `Your ${contentType.split('/')[1]} file has been downloaded.`,
      duration: 3000,
    });
  };

  const handleExportCSV = () => {
    if (!productDescription) {
      toast({
        title: "Export failed",
        description: "No product description available to export.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const csvContent = generateCSVContent({ 
      productDescription, 
      seoMetadata: seoMetadata || {
        seoTitle: productDescription.title,
        metaDescription: productDescription.description[0] || "",
        slug: productDescription.title.toLowerCase().replace(/\s+/g, '-'),
        tags: [productDescription.details.category],
        imageAltTexts: {}
      }, 
      images 
    });
    downloadFile(csvContent, 'product_description.csv', 'text/csv');
  };

  const handleExportHTML = () => {
    if (!productDescription) {
      toast({
        title: "Export failed",
        description: "No product description available to export.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const htmlContent = generateHTMLContent(productDescription);
    downloadFile(htmlContent, 'product_description.html', 'text/html');
  };

  const handleExportPlainText = () => {
    if (!productDescription) {
      toast({
        title: "Export failed",
        description: "No product description available to export.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const plainTextContent = generatePlainTextContent(productDescription);
    downloadFile(plainTextContent, 'product_description.txt', 'text/plain');
  };

  return (
    <div className="flex flex-col space-y-4">
      <Button 
        variant="secondary" 
        className="flex items-center justify-between px-4 py-2 bg-blue-50 text-blue-800 hover:bg-blue-100" 
        onClick={handleExportCSV}
        disabled={!productDescription}
      >
        <FileText className="h-4 w-4" />
        <span>Export as CSV for WooCommerce</span>
        <Download className="h-4 w-4" />
      </Button>
      <Button 
        variant="secondary" 
        className="flex items-center justify-between px-4 py-2" 
        onClick={handleExportHTML}
        disabled={!productDescription}
      >
        <FileText className="h-4 w-4" />
        <span>Export as HTML</span>
        <Download className="h-4 w-4" />
      </Button>
      <Button 
        variant="secondary" 
        className="flex items-center justify-between px-4 py-2" 
        onClick={handleExportPlainText}
        disabled={!productDescription}
      >
        <FileText className="h-4 w-4" />
        <span>Export as Plain Text</span>
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ExportOptions;
