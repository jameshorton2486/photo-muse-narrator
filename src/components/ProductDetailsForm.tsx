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
import { Loader } from "lucide-react";
import { ProductFormData, DescriptionPayload } from "@/types/product";
import { extractImageMetadata } from "@/services/imageProcessor";
import { generateDescription } from "@/services/descriptionGenerator";
import ProductDescription from "./ProductDescription";

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedDescription, setGeneratedDescription] = React.useState(null);
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
      setIsLoading(true);
      
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
      
      // Generate the AI description
      const description = await generateDescription(payload);
      setGeneratedDescription(description);
      
      toast({
        title: "Description generated successfully",
        description: "Your product description is ready.",
      });
    } catch (error) {
      toast({
        title: "Error generating description",
        description: "There was an error processing your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Product Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter product title" 
                    className="border-slate-200 focus-visible:ring-blue-500"
                    {...field} 
                  />
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
                <FormLabel className="text-slate-700">Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="border-slate-200 focus-visible:ring-blue-500">
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

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="dimensions.height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Height (in)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      className="border-slate-200 focus-visible:ring-blue-500"
                      {...field} 
                    />
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
                  <FormLabel className="text-slate-700">Width (in)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      className="border-slate-200 focus-visible:ring-blue-500"
                      {...field} 
                    />
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
                  <FormLabel className="text-slate-700">Depth (in)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.1" 
                      className="border-slate-200 focus-visible:ring-blue-500"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="materials"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Materials</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter materials" 
                    className="border-slate-200 focus-visible:ring-blue-500"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="0.01" 
                    className="border-slate-200 focus-visible:ring-blue-500"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Additional Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter condition, history, and other details"
                    className="min-h-[100px] border-slate-200 focus-visible:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white" 
            size="lg"
            disabled={isLoading || images.length === 0}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating Description...
              </>
            ) : (
              "Generate Description"
            )}
          </Button>
        </form>
      </Form>

      {generatedDescription && (
        <div className="mt-8 border-t pt-8">
          <ProductDescription description={generatedDescription} />
        </div>
      )}
    </div>
  );
}
