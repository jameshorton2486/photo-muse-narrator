import * as React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from './ui/button';
import type { ProductDescription } from '@/types/product';
import { generateCSVContent, generateHTMLContent, generatePlainTextContent } from '@/utils/exportUtils';

interface ExportOptionsProps {
  productDescription: ProductDescription;
  seoMetadata: any;
  images: string[];
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ productDescription, seoMetadata, images }) => {
  const downloadFile = (content: string, filename: string, contentType: string) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  };

  const handleExportCSV = () => {
    const csvContent = generateCSVContent({ productDescription, seoMetadata, images });
    downloadFile(csvContent, 'product_description.csv', 'text/csv');
  };

  const handleExportHTML = () => {
    const htmlContent = generateHTMLContent(productDescription);
    downloadFile(htmlContent, 'product_description.html', 'text/html');
  };

  const handleExportPlainText = () => {
    const plainTextContent = generatePlainTextContent(productDescription);
    downloadFile(plainTextContent, 'product_description.txt', 'text/plain');
  };

  return (
    <div className="flex flex-col space-y-4">
      <Button variant="secondary" className="flex items-center space-x-2" onClick={handleExportCSV}>
        <FileText className="h-4 w-4" />
        <span>Export as CSV</span>
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="secondary" className="flex items-center space-x-2" onClick={handleExportHTML}>
        <FileText className="h-4 w-4" />
        <span>Export as HTML</span>
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="secondary" className="flex items-center space-x-2" onClick={handleExportPlainText}>
        <FileText className="h-4 w-4" />
        <span>Export as Plain Text</span>
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ExportOptions;
