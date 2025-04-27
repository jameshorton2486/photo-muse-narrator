
import * as React from 'react';
import { ArrowDown } from 'lucide-react';

export default function WorkflowDiagram() {
  return (
    <div className="max-w-4xl mx-auto my-12 px-4 font-['Inter']">
      <h2 className="text-2xl font-bold text-center mb-12 text-slate-800">
        Kollect-It Workflow Diagram
      </h2>
      
      <div className="flex flex-col items-center space-y-8">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div 
              className={`w-full max-w-md p-6 rounded-lg shadow-sm transition-all duration-300 
                ${getStepBackground(step.type)} hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-center mb-3 text-slate-800">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-sm text-slate-600 text-center">
                      {step.description}
                    </p>
                  )}
                  {step.subItems && (
                    <ul className="mt-4 space-y-2 text-sm text-slate-600">
                      {step.subItems.map((item, i) => (
                        <li key={i} className="flex items-center justify-center">
                          <span className="block text-center">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <ArrowDown className="w-5 h-5 text-blue-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const getStepBackground = (type: string): string => {
  switch (type) {
    case 'input':
      return 'bg-blue-50 border-2 border-blue-200';
    case 'process':
      return 'bg-blue-100 border-2 border-blue-300';
    case 'review':
      return 'bg-blue-50 border-2 border-blue-200';
    case 'output':
      return 'bg-blue-100 border-2 border-blue-300';
    case 'analytics':
      return 'bg-blue-50 border-2 border-blue-200';
    default:
      return 'bg-slate-50 border-2 border-slate-200';
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
    title: "Display Review Modal",
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
    description: "Side-by-side view of original and enhanced descriptions",
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
    title: "WordPress API Upload",
    description: "Direct integration with WordPress for product publishing",
    type: "output"
  },
  {
    title: "Analytics Data",
    description: "System records usage metrics",
    type: "analytics",
    subItems: [
      "Number of Descriptions Generated",
      "Time Saved",
      "Most Edited Sections"
    ]
  }
];
