import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import CoverLetterList from "./components/cover-letter-list";
import { getCoverLetters } from "@/actions/cover-letter";

const CoverLetterPage = async () => {
  const coverLetters = await getCoverLetters();
  return (
    <div>
      <div className="space-y-8">
        <h1 className="text-6xl font-bold gradient-title">My Cover Letters</h1>
        <Link href="/cover-letter/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
        <div className="space-y-8" />
        <CoverLetterList coverLetters={coverLetters} />
      </div>
    </div>
  );
};

export default CoverLetterPage;
