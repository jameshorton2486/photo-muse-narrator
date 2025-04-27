
import * as React from 'react';
import { Input } from "@/components/ui/input";

interface ApiKeyInputProps {
  apiKey: string;
  onChange: (value: string) => void;
}

export const ApiKeyInput = ({ apiKey, onChange }: ApiKeyInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
        Claude API Key
      </label>
      <Input
        id="apiKey"
        type="password"
        placeholder="Enter your Claude API key"
        className="border-slate-200 focus-visible:ring-blue-500"
        value={apiKey}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
