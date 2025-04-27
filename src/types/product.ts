export interface ProductDimensions {
  height: string;
  width: string;
  depth: string;
}

export interface ProductFormData {
  title: string;
  category: string;
  details: string;
  dimensions: ProductDimensions;
  materials: string;
  era: string;
  price: string;
  itemNumber: string;
  seoMetadata?: SeoMetadata;
}

export interface ImageMetadata {
  filename: string;
  url: string;
  visualKeywords: string[];
}

export interface DescriptionPayload {
  formData: ProductFormData;
  images: ImageMetadata[];
}

export interface SeoMetadata {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  tags: string[];
  imageAltTexts: { [imageUrl: string]: string };
}
