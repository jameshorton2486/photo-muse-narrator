
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, FileText, Html, Csv } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ProductDescription, SeoMetadata } from '@/types/product';
import { generateCSVContent, generateHTMLContent, generatePlainTextContent } from '@/utils/exportUtils';

interface ExportOptionsProps {
  description: ProductDescription | null;
  seoMetadata?: SeoMetadata;
  images?: string[];
}

export default function ExportOptions({ description, seoMetadata, images = [] }: ExportOptionsProps) {
  const { toast } = useToast();

  const handleExport = (format: 'csv' | 'html' | 'text') => {
    if (!description) return;

    try {
      let content: string;
      let filename: string;
      let type: string;

      switch (format) {
        case 'csv':
          if (!seoMetadata) {
            throw new Error('SEO metadata is required for CSV export');
          }
          content = generateCSVContent({
            productDescription: description,
            seoMetadata,
            images
          });
          filename = 'product-description.csv';
          type = 'text/csv';
          break;
        case 'html':
          content = generateHTMLContent(description);
          filename = 'product-description.html';
          type = 'text/html';
          break;
        case 'text':
          content = generatePlainTextContent(description);
          filename = 'product-description.txt';
          type = 'text/plain';
          break;
        default:
          return;
      }

      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: `Description exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "There was an error exporting the description",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          disabled={!description}
          className="bg-[#E5E7EB] text-[#374151] hover:bg-[#D1D5DB] transition-colors duration-300 shadow-sm rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport('csv')} className="flex items-center gap-2">
          <Csv className="w-4 h-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('html')} className="flex items-center gap-2">
          <Html className="w-4 h-4" />
          Export as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('text')} className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Export as Text
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
