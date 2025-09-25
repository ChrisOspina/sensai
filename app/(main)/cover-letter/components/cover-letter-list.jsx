"use client";

import { deleteCoverLetter } from "@/actions/cover-letter";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

const CoverLetterList = ({ coverLetters }) => {
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

  console.log(coverLetters.length);

  if (!coverLetters?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Cover Letters Yet</CardTitle>
          <CardDescription>Create Your first Cover Letter</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      {coverLetters.map((letter) => {
        return (
          <Card key={letter.id} className="group relative ">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl gradient-title">
                    {letter.jobTitle} at {letter.companyName}
                  </CardTitle>
                  <CardDescription>
                    Created {format(new Date(letter.createdAt), "PPP")}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <AlertDialog>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => router.push(`/cover-letter/${letter.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Cover Letter?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your cover letter for {letter.jobTitle} at{" "}
                          {letter.companyName}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(letter.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-sm line-clamp-3">
                {letter.jobDescription}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CoverLetterList;
