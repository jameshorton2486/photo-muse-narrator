
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  details: z.string(),
  dimensions: z.object({
    height: z.string(),
    width: z.string(),
    depth: z.string(),
  }),
  materials: z.string(),
  era: z.string(),
  price: z.string(),
  itemNumber: z.string(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export type GeneratedDescription = {
  title: string;
  description: string[];
  distinguishingCharacteristics: string[];
  conditionReport: string;
  provenanceHistory: string;
  collectorValue: string;
  additionalDetails: string;
  shippingHandling: string;
};
