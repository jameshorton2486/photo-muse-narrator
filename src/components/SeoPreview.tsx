
import * as React from 'react';
import type { SeoMetadata } from '@/types/product';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface SeoPreviewProps {
  metadata: SeoMetadata;
  className?: string;
}

export default function SeoPreview({ metadata, className }: SeoPreviewProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">SEO Preview</h3>
          <p className="text-blue-600 text-lg font-medium">{metadata.seoTitle}</p>
          <p className="text-gray-600 text-sm">{metadata.metaDescription}</p>
          <p className="text-green-600 text-sm">kollect-it.com/products/{metadata.slug}</p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {metadata.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Image Alt Texts</h4>
          <div className="space-y-2">
            {Object.entries(metadata.imageAltTexts).map(([url, altText]) => (
              <div key={url} className="flex gap-2 items-start">
                <img src={url} alt={altText} className="w-8 h-8 object-cover rounded" />
                <p className="text-sm text-gray-600">{altText}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
