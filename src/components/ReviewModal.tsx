
import * as React from 'react';
import { Edit, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { ProductDescription } from '@/services/descriptionGenerator';

interface ReviewModalProps {
  description: ProductDescription;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  onStartOver: () => void;
}

export default function ReviewModal({
  description,
  isOpen,
  onOpenChange,
  onAccept,
  onStartOver,
}: ReviewModalProps) {
  const { toast } = useToast();
  const [editedDescription, setEditedDescription] = React.useState<ProductDescription>(description);

  const handleInputChange = (
    section: keyof ProductDescription,
    value: string | string[] | Record<string, string>
  ) => {
    setEditedDescription((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleAccept = () => {
    toast({
      title: "Changes saved",
      description: "Your edits have been applied successfully.",
    });
    onAccept();
  };

  const handleStartOver = () => {
    toast({
      title: "Starting over",
      description: "All changes have been discarded.",
    });
    onStartOver();
  };

  const renderCharacterCount = (text: string) => {
    return (
      <div className="text-xs text-gray-500 mt-1">
        {text.length} characters
      </div>
    );
  };

  const renderArraySection = (
    title: string,
    content: string[],
    field: keyof ProductDescription
  ) => (
    <AccordionItem value={title.toLowerCase()}>
      <AccordionTrigger className="text-lg font-semibold">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <Textarea
          value={content.join('\n')}
          onChange={(e) => handleInputChange(field, e.target.value.split('\n'))}
          className="min-h-[150px] mt-2"
        />
        {renderCharacterCount(content.join('\n'))}
      </AccordionContent>
    </AccordionItem>
  );

  const renderTextSection = (
    title: string,
    content: string,
    field: keyof ProductDescription
  ) => (
    <AccordionItem value={title.toLowerCase()}>
      <AccordionTrigger className="text-lg font-semibold">
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <Textarea
          value={content}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="min-h-[150px] mt-2"
        />
        {renderCharacterCount(content)}
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Review Description</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto pr-2">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="details">
              <AccordionTrigger className="text-lg font-semibold">
                Product Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 mt-2">
                  {Object.entries(editedDescription.details).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <Textarea
                        value={value}
                        onChange={(e) =>
                          handleInputChange('details', {
                            ...editedDescription.details,
                            [key]: e.target.value,
                          })
                        }
                        className="h-[60px]"
                      />
                      {renderCharacterCount(value)}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {renderArraySection(
              'Description',
              editedDescription.description,
              'description'
            )}

            {renderArraySection(
              'Distinguishing Characteristics',
              editedDescription.distinguishingCharacteristics,
              'distinguishingCharacteristics'
            )}

            {renderTextSection(
              'Condition Report',
              editedDescription.conditionReport,
              'conditionReport'
            )}

            {renderTextSection(
              'Provenance History',
              editedDescription.provenanceHistory,
              'provenanceHistory'
            )}

            {renderTextSection(
              'Collector Value',
              editedDescription.collectorValue,
              'collectorValue'
            )}

            {renderTextSection(
              'Additional Details',
              editedDescription.additionalDetails,
              'additionalDetails'
            )}

            {renderTextSection(
              'Shipping & Handling',
              editedDescription.shippingHandling,
              'shippingHandling'
            )}
          </Accordion>
        </div>

        <Separator className="my-4" />
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="destructive"
            onClick={handleStartOver}
            className="gap-2"
          >
            Start Over
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => onOpenChange(false)}
            >
              <Edit className="w-4 h-4" />
              Continue Editing
            </Button>
            <Button onClick={handleAccept} className="gap-2">
              Accept and Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
