
import { ProductDescription } from '@/services/descriptionGenerator';

export interface ExportData {
  title: string;
  category: string;
  description: string;
  price: string;
  itemNumber: string;
  images: string[];
}

export function generateCSVContent(data: ExportData): string {
  const headers = ['Image Filename', 'Product Title', 'Description', 'Price', 'SKU', 'Category'];
  const imageFiles = data.images.length ? data.images : [''];
  
  const rows = imageFiles.map(image => [
    image,
    data.title,
    data.description,
    data.price,
    data.itemNumber,
    data.category
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
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

