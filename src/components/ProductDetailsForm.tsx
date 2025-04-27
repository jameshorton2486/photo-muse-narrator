
import * as React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProductFormData, DescriptionPayload } from "@/types/product";
import { extractImageMetadata } from "@/services/imageProcessor";

const productSchema = z.object({
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

interface ProductDetailsFormProps {
  images: File[];
  onGenerateDescription: (payload: DescriptionPayload) => void;
}

export default function ProductDetailsForm({ images, onGenerateDescription }: ProductDetailsFormProps) {
  const { toast } = useToast();
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      category: "",
      details: "",
      dimensions: {
        height: "",
        width: "",
        depth: "",
      },
      materials: "",
      era: "",
      price: "",
      itemNumber: "",
    },
  });

  const onSubmit = async (formData: ProductFormData) => {
    try {
      // Process all images and extract metadata
      const imageMetadataPromises = images.map(file => extractImageMetadata(file));
      const processedImages = await Promise.all(imageMetadataPromises);

      // Prepare the payload
      const payload: DescriptionPayload = {
        formData,
        images: processedImages
      };

      // Send the payload up to the parent component
      onGenerateDescription(payload);
      
      toast({
        title: "Data collected successfully",
        description: "Preparing to generate description...",
      });
    } catch (error) {
      toast({
        title: "Error processing data",
        description: "There was an error preparing your data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="jewelry">Jewelry</SelectItem>
                  <SelectItem value="collectibles">Collectibles</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter condition, history, and other notes"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="dimensions.height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (in)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dimensions.width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width (in)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dimensions.depth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Depth (in)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="materials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materials</FormLabel>
                <FormControl>
                  <Input placeholder="Enter materials" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="era"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age/Era</FormLabel>
                <FormControl>
                  <Input placeholder="Enter age or era" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="itemNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter inventory code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Generate Description</Button>
      </form>
    </Form>
  );
}
