
import React from 'react';
import { FileText, Edit, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ToolbarProps {
  onClearAll: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onClearAll }) => {
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');

  const handleGenerateDescription = () => {
    toast({
      title: "Success",
      description: "Description generated!",
      duration: 3000,
    });
  };

  const handleExportData = () => {
    const csvContent = "Filename,Description\nimage1.jpg,Sample description\nimage2.jpg,Another description";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'description-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Data has been downloaded successfully",
      duration: 3000,
    });
  };

  return (
    <>
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm py-4 border-b z-10 shadow-sm mb-8">
        <div className="flex gap-3 justify-start">
          <Button
            variant="default"
            onClick={handleGenerateDescription}
            className="bg-[#2563EB] hover:bg-[#1E40AF] text-white font-semibold tracking-wide px-6 py-2 text-base transition-all duration-300 shadow-md rounded-lg flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Generate Description
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsEditOpen(true)}
            className="bg-[#E5E7EB] text-[#374151] hover:bg-[#D1D5DB] transition-colors duration-300 shadow-sm rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2"
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
          <Button
            variant="secondary"
            onClick={handleExportData}
            className="bg-[#E5E7EB] text-[#374151] hover:bg-[#D1D5DB] transition-colors duration-300 shadow-sm rounded-lg px-5 py-2 text-sm font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Data
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your description here..."
              className="min-h-[200px]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Toolbar;
