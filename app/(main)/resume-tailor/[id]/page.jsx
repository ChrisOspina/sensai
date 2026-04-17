import { getTailoredResume } from "@/actions/tailor-resume";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import TailoredResumePreview from "../components/tailored-resume-preview";
import { Button } from "@/components/ui/button";

const ViewTailoredResumePage = async ({ params }) => {
  const { id } = await params;
  const tailoredResume = await getTailoredResume(id);

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/resume-tailor">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Tailored Resumes
          </Button>
        </Link>

        <h1 className="text-6xl font-bold gradient-title mb-6">
          {tailoredResume?.jobTitle} at {tailoredResume?.companyName}
        </h1>
      </div>

      <TailoredResumePreview content={tailoredResume?.content} />
    </div>
  );
};

export default ViewTailoredResumePage;
