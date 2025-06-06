import type { ProductDescription, SeoMetadata, WooCommerceCSVFields } from '@/types/product';

export interface ExportData {
  productDescription: ProductDescription;
  seoMetadata: SeoMetadata;
  images: string[];
}

export function generateCSVContent(data: ExportData): string {
  // Define headers using WooCommerce compatible field names
  const headers = [
    'SKU',
    'Name',
    'SEO Title',
    'Slug',
    'Meta Description',
    'Tags',
    'Regular Price',
    'Categories',
    'Description',
    'Images',
    'Alt Text',
    'Shipping Notes'
  ];
  
  // Format data according to WooCommerce fields
  const wooCommerceData: WooCommerceCSVFields = {
    sku: data.productDescription.details.itemNumber,
    name: data.productDescription.title,
    seoTitle: data.seoMetadata.seoTitle,
    slug: data.seoMetadata.slug,
    metaDescription: data.seoMetadata.metaDescription,
    tags: data.seoMetadata.tags.join(', '),
    regularPrice: data.productDescription.details.price,
    categories: data.productDescription.details.category,
    description: [
      ...data.productDescription.description,
      '\n<h3>Distinguishing Characteristics</h3>',
      '<ul>',
      ...data.productDescription.distinguishingCharacteristics.map(char => `<li>${char}</li>`),
      '</ul>',
      '\n<h3>Condition Report</h3>',
      `<p>${data.productDescription.conditionReport}</p>`,
      '\n<h3>Provenance/History</h3>',
      `<p>${data.productDescription.provenanceHistory}</p>`,
      '\n<h3>Collector Value</h3>',
      `<p>${data.productDescription.collectorValue}</p>`,
      '\n<h3>Additional Details</h3>',
      `<p>${data.productDescription.additionalDetails}</p>`
    ].join('\n'),
    images: data.images.join('|'),
    altText: Object.values(data.seoMetadata.imageAltTexts).join('|'),
    shippingNotes: data.productDescription.shippingHandling
  };
  
  // Convert the data to a CSV row
  const row = Object.values(wooCommerceData).map(value => {
    if (value === null || value === undefined) return '""';
    return `"${String(value).replace(/"/g, '""')}"`;
  });
  
  return headers.join(',') + '\n' + row.join(',');
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
      <p><strong>Price:</strong> $${data.details.price}</p>
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
    
    <h2>Collector Value</h2>
    <p>${data.collectorValue}</p>
    
    <h2>Additional Details</h2>
    <p>${data.additionalDetails}</p>
    
    <h2>Shipping & Handling</h2>
    <p>${data.shippingHandling}</p>
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
Price: $${data.details.price}

DESCRIPTION
${data.description.join('\n\n')}

DISTINGUISHING CHARACTERISTICS
${data.distinguishingCharacteristics.map(char => `- ${char}`).join('\n')}

CONDITION REPORT
${data.conditionReport}

PROVENANCE/HISTORY
${data.provenanceHistory}

COLLECTOR VALUE
${data.collectorValue}

ADDITIONAL DETAILS
${data.additionalDetails}

SHIPPING & HANDLING
${data.shippingHandling}
  `.trim();
}
