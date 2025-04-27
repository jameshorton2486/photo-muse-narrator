
import * as React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SettingsFormValues {
  defaultTemplate: string;
  csvFormat: string;
  notificationEmail: string;
}

export default function Settings() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      defaultTemplate: '',
      csvFormat: 'title,description,price,sku,category',
      notificationEmail: '',
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
    console.log(data);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6">
        <Alert>
          <AlertDescription>
            To securely store API keys and enable email notifications, please connect your project to Supabase using the green Supabase button in the top right corner.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Description Templates</CardTitle>
            <CardDescription>
              Set default templates for product descriptions by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="defaultTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Template</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your default product description template..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Use {'{category}'}, {'{title}'}, etc. as placeholders
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
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Comma-separated list of fields for CSV export
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notificationEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Receive notifications when exports are complete
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
