import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { ProductDescription } from "@/services/descriptionGenerator";
import { generateHTMLContent, generatePlainTextContent } from "@/utils/exportUtils";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description: ProductDescription | null;
}

export function ReviewModal({ open, onOpenChange, description }: ReviewModalProps) {
  const { toast } = useToast();
  const [activeFormat, setActiveFormat] = React.useState("html");
  
  if (!description) {
    return null;
  }

  const formattedContent = activeFormat === "html" 
    ? generateHTMLContent(description)
    : generatePlainTextContent(description);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formattedContent);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy content",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Review Description</DialogTitle>
          <DialogDescription>
            Here's the generated description. Review and copy as needed.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="html" className="space-y-4">
          <TabsList>
            <TabsTrigger value="html" onClick={() => setActiveFormat("html")}>HTML</TabsTrigger>
            <TabsTrigger value="plaintext" onClick={() => setActiveFormat("plaintext")}>Plain Text</TabsTrigger>
          </TabsList>
          <TabsContent value="html">
            <div className="rounded-md border p-4 bg-muted text-foreground">
              <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
            </div>
          </TabsContent>
          <TabsContent value="plaintext">
            <div className="rounded-md border p-4 bg-muted text-foreground whitespace-pre-line">
              {formattedContent}
            </div>
          </TabsContent>
        </Tabs>
        <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
      </DialogContent>
    </Dialog>
  );
}
