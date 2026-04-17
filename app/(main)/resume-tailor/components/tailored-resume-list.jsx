"use client";

import { deleteTailoredResume } from "@/actions/tailor-resume";
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

const TailoredResumeList = ({ tailoredResumes }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteTailoredResume(id);
      toast.success("Successfully deleted tailored resume");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to delete tailored resume");
    }
  };

  if (!tailoredResumes?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Tailored Resumes Yet</CardTitle>
          <CardDescription>
            Create your first tailored resume for a job application
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tailoredResumes.map((resume) => {
        return (
          <Card key={resume.id} className="group relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl gradient-title">
                    {resume.jobTitle} at {resume.companyName}
                  </CardTitle>
                  <CardDescription>
                    Created {format(new Date(resume.createdAt), "PPP")}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push(`/resume-tailor/${resume.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Tailored Resume?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete
                          your tailored resume for {resume.jobTitle} at{" "}
                          {resume.companyName}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(resume.id)}
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
                {resume.jobDescription}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TailoredResumeList;
