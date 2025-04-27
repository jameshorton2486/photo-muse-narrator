
import * as React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import type { ProductDescription, DescriptionPayload } from "@/types/product";
import type { ProductFormData } from "@/types/form";
import { productSchema } from "@/types/form";
import { extractImageMetadata } from "@/services/imageProcessor";
import { generateDescription } from "@/services/descriptionGenerator";
import { BasicFields } from "./form/BasicFields";
import { DimensionsInput } from "./form/DimensionsInput";
import { ApiKeyInput } from "./form/ApiKeyInput";

interface ProductDetailsFormProps {
  images: File[];
  onGenerateDescription: (payload: DescriptionPayload) => void;
}

export default function ProductDetailsForm({ images, onGenerateDescription }: ProductDetailsFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiKey, setApiKey] = React.useState('');
  const [generatedDescription, setGeneratedDescription] = React.useState<ProductDescription | null>(null);
  
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
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Claude API key to generate descriptions.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      const imageMetadataPromises = images.map(file => extractImageMetadata(file));
      const processedImages = await Promise.all(imageMetadataPromises);

      const payload: DescriptionPayload = {
        formData,
        images: processedImages
      };

      onGenerateDescription(payload);
      
      const description = await generateDescription(payload, apiKey);
      setGeneratedDescription(description);
      
      toast({
        title: "Description generated successfully",
        description: "Your product description is ready.",
      });
    } catch (error) {
      toast({
        title: "Error generating description",
        description: "There was an error connecting to Claude AI. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BasicFields form={form} />
        <DimensionsInput form={form} />

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

        <ApiKeyInput apiKey={apiKey} onChange={setApiKey} />

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
  );
}
