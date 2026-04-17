import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import TailoredResumeGenerator from "../components/tailored-resume-generator";

const NewTailorResumePage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/resume-tailor">
          <Button variant={"link"} className={"gap-2 pl-0"}>
            <ArrowLeft className="w-4 h-4" />
            Back to Tailored Resumes
          </Button>
        </Link>
        <div className="space-y-8">
          <h1 className="text-6xl font-bold gradient-title">
            Tailor Your Resume
          </h1>
          <p className="text-muted-foreground">
            Generate a tailored resume optimized for your job application
          </p>
        </div>
      </div>
      <TailoredResumeGenerator />
    </div>
  );
};

export default NewTailorResumePage;
