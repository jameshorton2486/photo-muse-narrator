
import * as React from 'react';
import { ArrowDown } from 'lucide-react';

export default function WorkflowDiagram() {
  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-slate-800">Kollect-It Workflow Diagram</h2>
      
      <div className="flex flex-col items-center space-y-4">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={`w-full max-w-md p-4 rounded-lg border-2 ${getStepColor(step.type)}`}>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold mr-3">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  {step.description && (
                    <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                  )}
                  {step.subItems && (
                    <ul className="list-disc pl-5 mt-2 text-sm text-slate-600">
                      {step.subItems.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <ArrowDown className="w-6 h-6 text-slate-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const getStepColor = (type: string): string => {
  switch (type) {
    case 'input':
      return 'border-blue-300 bg-blue-50';
    case 'process':
      return 'border-purple-300 bg-purple-50';
    case 'review':
      return 'border-amber-300 bg-amber-50';
    case 'output':
      return 'border-green-300 bg-green-50';
    case 'analytics':
      return 'border-indigo-300 bg-indigo-50';
    default:
      return 'border-gray-300 bg-gray-50';
  }
};

const steps = [
  {
    title: "Upload Images + Text Input",
    description: "User uploads product images and fills form with product details",
    type: "input"
  },
  {
    title: "Collect Images + Form Data",
    description: "System validates and processes inputs for AI processing",
    type: "process"
  },
  {
    title: "Generate Initial Description (Claude AI)",
    description: "System sends data to Claude AI for initial description generation",
    type: "process"
  },
  {
    title: "Display Review Modal (Editable Fields)",
    description: "User reviews AI-generated description with ability to edit each section",
    type: "review"
  },
  {
    title: "User Edits and Approves",
    description: "User makes adjustments to the content before final processing",
    type: "review"
  },
  {
    title: "Expand & Enhance (ChatGPT/OpenAI)",
    description: "System sends edited description to ChatGPT for enhancement",
    type: "process"
  },
  {
    title: "Display Final Enhanced Description",
    description: "Side-by-side view of original and enhanced descriptions for comparison",
    type: "review"
  },
  {
    title: "Export Options",
    description: "User selects export format",
    type: "output",
    subItems: [
      "CSV for WordPress",
      "HTML for Copy-Paste",
      "Plain Text"
    ]
  },
  {
    title: "Optional: WordPress API Upload",
    description: "Direct integration with WordPress for product publishing",
    type: "output"
  },
  {
    title: "Save Analytics Data",
    description: "System records usage metrics for reporting",
    type: "analytics",
    subItems: [
      "Number of Descriptions Generated",
      "Time Saved",
      "Most Edited Sections"
    ]
  }
];
