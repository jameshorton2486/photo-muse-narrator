
import * as React from 'react';
import { FileText, Edit, X, Settings, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import ExportOptions from '@/components/ExportOptions';
import type { ProductDescription, SeoMetadata } from '@/types/product';

interface ToolbarProps {
  onClearAll: () => void;
  onGenerateDescription: () => void;
  description: ProductDescription | null;
  seoMetadata?: SeoMetadata | null;
}

export default function Toolbar({ 
  onClearAll, 
  onGenerateDescription, 
  description,
  seoMetadata = null
}: ToolbarProps) {
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editText, setEditText] = React.useState('');

  return (
    <div className="sticky top-0 bg-white/80 backdrop-blur-sm py-4 border-b z-10 shadow-sm mb-8">
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <Button
            variant="default"
            onClick={onGenerateDescription}
            className="bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold tracking-wide px-6 py-2 text-base transition-all duration-300 shadow-md rounded-lg flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Generate Description
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsEditOpen(true)}
            className="bg-[#E5E7EB] text-[#374151] hover:bg-[#D1D5DB] transition-colors duration-300 shadow-sm rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2"
            disabled={!description}
          >
            <Edit className="w-4 h-4" />
            Edit Description
          </Button>
          <Button
            variant="secondary"
            onClick={onClearAll}
            className="bg-[#E5E7EB] text-[#374151] hover:bg-[#D1D5DB] transition-colors duration-300 shadow-sm rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear All
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <ExportOptions productDescription={description} seoMetadata={seoMetadata} />
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            asChild
          >
            <Link to="/analytics">
              <BarChart className="w-4 h-4 mr-2" />
              Analytics
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
          >
            <Link to="/settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Description</DialogTitle>
            <DialogDescription>
              Manually edit the description for your images below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Enter your description here..."
              className="min-h-[200px]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
