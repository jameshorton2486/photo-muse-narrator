
import * as React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/types/form";

interface DimensionsInputProps {
  form: UseFormReturn<ProductFormData>;
}

export const DimensionsInput = ({ form }: DimensionsInputProps) => {
  return (
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
  );
};
