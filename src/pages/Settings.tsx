
import * as React from 'react';
import { Settings as SettingsIcon, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

const STORAGE_KEY = 'kollectit-settings';
const DEFAULT_TEMPLATE = 'Category: {category}\nTitle: {title}\nDimensions: {dimensions}\nMaterials: {materials}\nCondition: {condition}\n\nDescription:\n{description}';
const DEFAULT_CSV_FORMAT = 'sku,product_title,seo_title,product_slug,meta_description,tags,price,category,full_description,image_filename_1,alt_text_1,image_filename_2,alt_text_2,shipping_notes';

interface SettingsFormValues {
  defaultTemplate: string;
  csvFormat: string;
}

export default function Settings() {
  const { toast } = useToast();
  
  // Load settings from localStorage or use defaults
  const loadSavedSettings = (): SettingsFormValues => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        defaultTemplate: parsed.default_template || DEFAULT_TEMPLATE,
        csvFormat: parsed.csv_export_format || DEFAULT_CSV_FORMAT,
      };
    }
    return {
      defaultTemplate: DEFAULT_TEMPLATE,
      csvFormat: DEFAULT_CSV_FORMAT,
    };
  };

  const form = useForm<SettingsFormValues>({
    defaultValues: loadSavedSettings(),
  });

  const onSubmit = (data: SettingsFormValues) => {
    const settings = {
      default_template: data.defaultTemplate,
      csv_export_format: data.csvFormat,
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  const handleReset = () => {
    form.reset({
      defaultTemplate: DEFAULT_TEMPLATE,
      csvFormat: DEFAULT_CSV_FORMAT,
    });
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Settings reset",
      description: "Your settings have been reset to default values.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Description Templates</CardTitle>
            <CardDescription>
              Configure your default product description template and CSV export format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="defaultTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Template</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your default product description template..."
                          className="min-h-[200px] font-mono text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Use placeholders like {'{title}'}, {'{category}'}, {'{materials}'}, {'{dimensions}'}, etc.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="csvFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CSV Export Format</FormLabel>
                      <FormControl>
                        <Input {...field} className="font-mono text-sm" />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of fields for WooCommerce CSV export
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button type="submit">Save Settings</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleReset}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
