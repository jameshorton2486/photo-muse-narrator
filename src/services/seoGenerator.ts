import type { DescriptionPayload, SeoMetadata } from '@/types/product';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function truncateDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '...');
}

export async function generateSeoMetadata(payload: DescriptionPayload): Promise<SeoMetadata> {
  const { formData, images } = payload;
  
  // Generate SEO title - keep it under 60 characters
  const seoTitle = `${formData.title} - ${formData.category} ${formData.era || ''}`.slice(0, 60);
  
  // Generate meta description from the first paragraph of details
  const metaDescription = truncateDescription(formData.details);
  
  // Generate slug from title
  const slug = generateSlug(formData.title);
  
  // Generate tags based on product details
  const tags = [
    formData.category.toLowerCase(),
    formData.materials.toLowerCase(),
    formData.era?.toLowerCase(),
    `vintage ${formData.category.toLowerCase()}`,
    'collectible'
  ].filter((tag, index, self) => tag && self.indexOf(tag) === index).slice(0, 5);

  // Generate alt texts for images based on visual keywords
  const imageAltTexts: { [key: string]: string } = {};
  images.forEach((image) => {
    const keywords = image.visualKeywords || [];
    const altText = `${formData.title} - ${keywords.slice(0, 3).join(', ')}`.slice(0, 125);
    imageAltTexts[image.url] = altText;
  });

  return {
    seoTitle,
    metaDescription,
    slug,
    tags,
    imageAltTexts
  };
}
