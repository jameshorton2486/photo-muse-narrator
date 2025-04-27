import type { DescriptionPayload, SeoMetadata } from '@/types/product';

interface ProductDetails {
  category: string;
  originPeriod: string;
  age: string;
  materials: string;
  dimensions: string;
  condition: string;
  itemNumber: string;
  price: string;
}

export interface ProductDescription {
  title: string;
  details: ProductDetails;
  description: string[];
  distinguishingCharacteristics: string[];
  conditionReport: string;
  provenanceHistory: string;
  collectorValue: string;
  additionalDetails: string;
  shippingHandling: string;
}

export interface GeneratedContent {
  description: ProductDescription;
  seoMetadata: SeoMetadata;
}

interface ClaudeMessage {
  role: string;
  content: string;
}

async function createClaudePrompt(payload: DescriptionPayload): Promise<string> {
  const dimensions = `${payload.formData.dimensions.height}″ × ${payload.formData.dimensions.width}″ × ${payload.formData.dimensions.depth}″`;
  
  return `Create a detailed product description for an antique/collectible item with these specifications:

Title: ${payload.formData.title}
Category: ${payload.formData.category}
Materials: ${payload.formData.materials}
Dimensions: ${dimensions}
Price: $${payload.formData.price}
Additional Details: ${payload.formData.details}

${payload.images.length > 0 ? `Visual Keywords from Images: ${payload.images.map(img => img.visualKeywords.join(', ')).join('; ')}` : ''}

Please provide a structured response with these sections:
1. Product Details (technical specifications)
2. Description (engaging narrative)
3. Distinguishing Characteristics (5 key features)
4. Condition Report
5. Provenance/History
6. Collector Value Assessment
7. Additional Details
8. Shipping & Handling Information

Format as JSON matching this structure:
{
  "title": "string",
  "details": {
    "category": "string",
    "originPeriod": "string",
    "age": "string",
    "materials": "string",
    "dimensions": "string",
    "condition": "string",
    "itemNumber": "string",
    "price": "string"
  },
  "description": ["string array of paragraphs"],
  "distinguishingCharacteristics": ["string array"],
  "conditionReport": "string",
  "provenanceHistory": "string",
  "collectorValue": "string",
  "additionalDetails": "string",
  "shippingHandling": "string"
}`;
}

async function callClaudeAPI(prompt: string, apiKey: string): Promise<any> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 4000,
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate description with Claude AI');
  }

  const data = await response.json();
  return JSON.parse(data.content[0].text);
}

export async function generateDescription(
  payload: DescriptionPayload, 
  apiKey?: string
): Promise<GeneratedContent> {
  if (!apiKey) {
    throw new Error('Claude API key is required');
  }

  const [description, seoMetadata] = await Promise.all([
    (async () => {
      const prompt = await createClaudePrompt(payload);
      return await callClaudeAPI(prompt, apiKey);
    })(),
    generateSeoMetadata(payload)
  ]);

  return {
    description,
    seoMetadata
  };
}
