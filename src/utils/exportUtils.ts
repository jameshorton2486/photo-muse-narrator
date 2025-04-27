
import type { ProductDescription } from '@/types/product';
import type { SeoMetadata } from '@/types/product';

export interface ExportData {
  productDescription: ProductDescription;
  seoMetadata: SeoMetadata;
  images: string[];
}

export function generateCSVContent(data: ExportData): string {
  const headers = [
    'Image Name',
    'SKU',
    'Product Title',
    'SEO Title',
    'Product Slug',
    'Meta Description',
    'Tags',
    'Regular Price',
    'Categories',
    'Description',
    'Image Alt Text',
    'Shipping Information'
  ];
  
  const mainRow = [
    data.images.join('|'),
    data.productDescription.details.itemNumber,
    data.productDescription.title,
    data.seoMetadata.seoTitle,
    data.seoMetadata.slug,
    data.seoMetadata.metaDescription,
    data.seoMetadata.tags.join('|'),
    data.productDescription.details.price,
    data.productDescription.details.category,
    [
      ...data.productDescription.description,
      '\nDistinguishing Characteristics:',
      ...data.productDescription.distinguishingCharacteristics.map(char => `- ${char}`),
      '\nCondition Report:',
      data.productDescription.conditionReport,
      '\nProvenance/History:',
      data.productDescription.provenanceHistory,
      '\nCollector Value:',
      data.productDescription.collectorValue,
      '\nAdditional Details:',
      data.productDescription.additionalDetails
    ].join('\n'),
    Object.values(data.seoMetadata.imageAltTexts).join('|'),
    data.productDescription.shippingHandling
  ];

  return [
    headers.join(','),
    mainRow.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
  ].join('\n');
}

export function generateHTMLContent(data: ProductDescription): string {
  return `
    <h1>${data.title}</h1>
    <div class="product-details">
      <p><strong>Category:</strong> ${data.details.category}</p>
      <p><strong>Origin/Period:</strong> ${data.details.originPeriod}</p>
      <p><strong>Materials:</strong> ${data.details.materials}</p>
      <p><strong>Dimensions:</strong> ${data.details.dimensions}</p>
      <p><strong>Condition:</strong> ${data.details.condition}</p>
      <p><strong>Item Number:</strong> ${data.details.itemNumber}</p>
      <p><strong>Price:</strong> ${data.details.price}</p>
    </div>
    
    <div class="description">
      ${data.description.map(para => `<p>${para}</p>`).join('\n')}
    </div>
    
    <h2>Distinguishing Characteristics</h2>
    <ul>
      ${data.distinguishingCharacteristics.map(char => `<li>${char}</li>`).join('\n')}
    </ul>
    
    <h2>Condition Report</h2>
    <p>${data.conditionReport}</p>
    
    <h2>Provenance/History</h2>
    <p>${data.provenanceHistory}</p>
    
    <h2>Additional Details</h2>
    <p>${data.additionalDetails}</p>
  `;
}

export function generatePlainTextContent(data: ProductDescription): string {
  return `
${data.title}

PRODUCT DETAILS
Category: ${data.details.category}
Origin/Period: ${data.details.originPeriod}
Materials: ${data.details.materials}
Dimensions: ${data.details.dimensions}
Condition: ${data.details.condition}
Item Number: ${data.details.itemNumber}
Price: ${data.details.price}

DESCRIPTION
${data.description.join('\n\n')}

DISTINGUISHING CHARACTERISTICS
${data.distinguishingCharacteristics.map(char => `- ${char}`).join('\n')}

CONDITION REPORT
${data.conditionReport}

PROVENANCE/HISTORY
${data.provenanceHistory}

ADDITIONAL DETAILS
${data.additionalDetails}
  `.trim();
}

