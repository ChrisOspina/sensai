import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import TailoredResumeList from "./components/tailored-resume-list";
import { getTailoredResumes } from "@/actions/tailor-resume";

const TailorResumePage = async () => {
  const tailoredResumes = await getTailoredResumes();

  return (
    <div>
      <div className="space-y-8">
        <h1 className="text-6xl font-bold gradient-title">
          My Tailored Resumes
        </h1>
        <Link href="/resume-tailor/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
        <div className="space-y-8" />
        <TailoredResumeList tailoredResumes={tailoredResumes} />
      </div>
    </div>
  );
};

export default TailorResumePage;
