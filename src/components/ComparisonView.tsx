
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ProductDescription from '@/components/ProductDescription';
import type { ProductDescription as ProductDescriptionType } from '@/services/descriptionGenerator';
import { ArrowRight } from 'lucide-react';

interface ComparisonViewProps {
  originalDescription: ProductDescriptionType;
  enhancedDescription: ProductDescriptionType | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export default function ComparisonView({
  originalDescription,
  enhancedDescription,
  isOpen,
  onOpenChange,
  onAccept,
}: ComparisonViewProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[90vw] sm:max-w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">Review Enhanced Description</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">Original Description</h3>
            <ProductDescription description={originalDescription} />
          </div>
          
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Enhanced Description
              <ArrowRight className="w-4 h-4 text-blue-500" />
            </h3>
            {enhancedDescription ? (
              <ProductDescription description={enhancedDescription} />
            ) : (
              <div className="flex items-center justify-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Continue Editing
          </Button>
          <Button
            onClick={onAccept}
            disabled={!enhancedDescription}
          >
            Accept Enhanced Version
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
