
import * as React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface SettingsFormValues {
  defaultTemplate: string;
  csvFormat: string;
}

const DEFAULT_TEMPLATE = 'Category: {category}\nTitle: {title}\nDimensions: {dimensions}\nMaterials: {materials}\nCondition: {condition}\n\nDescription:\n{description}';
const DEFAULT_CSV_FORMAT = 'sku,product_title,seo_title,product_slug,meta_description,tags,price,category,full_description,image_filename_1,alt_text_1,image_filename_2,alt_text_2,shipping_notes';

export default function Settings() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      defaultTemplate: localStorage.getItem('default_template') || DEFAULT_TEMPLATE,
      csvFormat: localStorage.getItem('csv_export_format') || DEFAULT_CSV_FORMAT,
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    localStorage.setItem('default_template', data.defaultTemplate);
    localStorage.setItem('csv_export_format', data.csvFormat);

    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully to browser storage.",
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

                <Button type="submit">Save Settings</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
