"use client";

import { deleteCoverLetter } from "@/actions/cover-letter";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CoverLetterList = async ({ coverLetters }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Succesfully deleted cover letter");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Cover Letters Yet</CardTitle>
          <CardDescription>Create Your first Cover Letter</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return <div>Cover Letter List</div>;
};

export default CoverLetterList;
