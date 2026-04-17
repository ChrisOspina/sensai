"use client";

import { Printer, Loader2 } from "lucide-react";
import React, { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

const TailoredResumePreview = ({ content }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef();

  const reactToPrintFn = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "tailored-resume",
    removeAfterPrint: false,
  });

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      console.log("printing");
      await new Promise((resolve, reject) => {
        try {
          reactToPrintFn?.();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="py-4">
      <div className="space-x-2 mb-4">
        <Button onClick={generatePDF} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Printer className="mr-2 h-4 w-4" />
              Print / Save as PDF
            </>
          )}
        </Button>
      </div>
      <div className="border rounded-lg">
        <MDEditor value={content} preview="preview" height={700} />
      </div>
      <div className="hidden">
        <div ref={resumeRef}>
          <MDEditor.Markdown
            source={content}
            style={{
              background: "white",
              color: "black",
              padding: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TailoredResumePreview;
