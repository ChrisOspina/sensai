"use client";

import { Printer, Loader2 } from "lucide-react";
import React, { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";

const CoverLetterPreview = ({ content }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const coverLetterRef = useRef();

  const reactToPrintFn = useReactToPrint({
    contentRef: coverLetterRef,
    documentTitle: "cover letter",
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
      toast.error("This functionality is broken");
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <div className="py-4">
      <div className="space-x-2">
        <Button onClick={generatePDF} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Printer className="h-4 w-4" />
              Print
            </>
          )}
        </Button>
      </div>
      <div className="border rounded-lg">
        <MDEditor value={content} preview="preview" height={700} />
      </div>
      <div className="hidden">
        <div ref={coverLetterRef}>
          <MDEditor.Markdown
            source={content}
            style={{
              background: "white",
              color: "black",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
