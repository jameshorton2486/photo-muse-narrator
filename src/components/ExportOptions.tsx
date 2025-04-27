
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ProductDescription } from '@/services/descriptionGenerator';
import { generateCSVContent, generateHTMLContent, generatePlainTextContent } from '@/utils/exportUtils';

interface ExportOptionsProps {
  description: ProductDescription | null;
}

export default function ExportOptions({ description }: ExportOptionsProps) {
  const { toast } = useToast();

  const handleExport = (format: 'csv' | 'html' | 'text') => {
    if (!description) return;

    try {
      let content: string;
      let filename: string;
      let type: string;

      switch (format) {
        case 'csv':
          content = generateCSVContent({
            title: description.title,
            category: description.details.category,
            description: description.description.join('\n'),
            price: description.details.price,
            itemNumber: description.details.itemNumber,
            images: []
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
        description: "There was an error exporting the description",
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
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('html')}>
          Export as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('text')}>
          Export as Text
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
