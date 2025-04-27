
import * as React from 'react';
import type { ProductDescription } from '@/types/product';

interface ProductDescriptionProps {
  description: ProductDescription;
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="prose max-w-none">
      <h1 className="text-2xl font-bold text-slate-900">{description.title}</h1>
      
      <h2 className="text-xl font-semibold mt-6 text-slate-800">Product Details</h2>
      <ul className="list-none space-y-2">
        <li><strong>Category:</strong> {description.details.category}</li>
        <li><strong>Origin/Period:</strong> {description.details.originPeriod}</li>
        <li><strong>Age:</strong> {description.details.age}</li>
        <li><strong>Materials:</strong> {description.details.materials}</li>
        <li><strong>Dimensions:</strong> {description.details.dimensions}</li>
        <li><strong>Condition:</strong> {description.details.condition}</li>
        <li><strong>Item Number:</strong> {description.details.itemNumber}</li>
        <li><strong>Price:</strong> ${description.details.price}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 text-slate-800">Description</h2>
      {description.description.map((paragraph, index) => (
        <p key={index} className="mt-2 text-slate-600">{paragraph}</p>
      ))}

      <h2 className="text-xl font-semibold mt-6 text-slate-800">Distinguishing Characteristics</h2>
      <ul className="list-disc pl-5 space-y-1">
        {description.distinguishingCharacteristics.map((feature, index) => (
          <li key={index} className="text-slate-600">{feature}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 text-slate-800">Condition Report</h2>
      <p className="text-slate-600">{description.conditionReport}</p>

      <h2 className="text-xl font-semibold mt-6 text-slate-800">Provenance/History</h2>
      <p className="text-slate-600">{description.provenanceHistory}</p>

      <h2 className="text-xl font-semibold mt-6 text-slate-800">Collector Value</h2>
      <p className="text-slate-600">{description.collectorValue}</p>

      <h2 className="text-xl font-semibold mt-6 text-slate-800">Additional Details</h2>
      <p className="text-slate-600">{description.additionalDetails}</p>

      <h2 className="text-xl font-semibold mt-6 text-slate-800">Shipping & Handling</h2>
      <p className="text-slate-600">{description.shippingHandling}</p>
    </div>
  );
}
