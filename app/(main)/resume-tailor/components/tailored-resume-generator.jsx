"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tailoredResumeSchema } from "@/app/lib/schema";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import {
  generateTailoredResume,
  getUserResume,
  parseResumeFile,
} from "@/actions/tailor-resume";
import { Loader2, Upload, FileText } from "lucide-react";
import { toast } from "sonner";

const TailoredResumeGenerator = () => {
  const router = useRouter();
  const [resumeSource, setResumeSource] = useState("existing");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [resumeText, setResumeText] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(tailoredResumeSchema),
    defaultValues: {
      resumeSource: "existing",
    },
  });

  const {
    loading: generating,
    fn: generateResumeFn,
    data: generatedResume,
  } = useFetch(generateTailoredResume);

  const {
    loading: loadingExistingResume,
    fn: fetchUserResumeFn,
    data: existingResume,
  } = useFetch(getUserResume);

  const {
    loading: parsingFile,
    fn: parseFileFn,
    data: parsedFileData,
  } = useFetch(parseResumeFile);

  // Fetch existing resume when component mounts or when source changes to "existing"
  useEffect(() => {
    if (resumeSource === "existing") {
      fetchUserResumeFn();
    }
  }, [resumeSource]);

  // Set resume text when existing resume is fetched
  useEffect(() => {
    if (existingResume && resumeSource === "existing") {
      setResumeText(existingResume.content);
    }
  }, [existingResume, resumeSource]);

  // Set resume text when file is parsed
  useEffect(() => {
    if (parsedFileData && resumeSource === "upload") {
      setResumeText(parsedFileData.text);
      toast.success("Resume file parsed successfully");
    }
  }, [parsedFileData, resumeSource]);

  // Redirect when resume is generated
  useEffect(() => {
    if (generatedResume) {
      toast.success("Tailored resume generated successfully");
      router.push(`/resume-tailor/${generatedResume.id}`);
      reset();
      setUploadedFile(null);
      setResumeText("");
    }
  }, [generatedResume]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or DOCX file");
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploadedFile(file);

    // Parse the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      await parseFileFn(formData);
    } catch (error) {
      toast.error(error.message || "Failed to parse resume file");
      setUploadedFile(null);
    }
  };

  const handleResumeSourceChange = (value) => {
    setResumeSource(value);
    setValue("resumeSource", value);
    setUploadedFile(null);
    setResumeText("");
  };

  const onSubmit = async (data) => {
    // Validate that we have resume text
    if (!resumeText || resumeText.trim().length === 0) {
      if (resumeSource === "existing") {
        toast.error(
          "You don't have an existing resume. Please build one first or upload a resume file."
        );
      } else {
        toast.error("Please upload a resume file");
      }
      return;
    }

    try {
      await generateResumeFn({
        ...data,
        resumeText,
      });
    } catch (error) {
      toast.error(error.message || "Failed to generate tailored resume");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Source</CardTitle>
          <CardDescription>
            Choose how to provide your resume for tailoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={resumeSource} onValueChange={handleResumeSourceChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="existing" id="existing" />
              <Label htmlFor="existing" className="cursor-pointer">
                Use my existing resume from the app
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upload" id="upload" />
              <Label htmlFor="upload" className="cursor-pointer">
                Upload a resume file (PDF or DOCX)
              </Label>
            </div>
          </RadioGroup>

          {resumeSource === "existing" && (
            <div className="mt-4">
              {loadingExistingResume ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading your resume...
                </div>
              ) : existingResume ? (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <FileText className="h-4 w-4" />
                  Resume loaded successfully
                </div>
              ) : (
                <p className="text-sm text-red-500">
                  No existing resume found. Please build your resume first or upload
                  a file.
                </p>
              )}
            </div>
          )}

          {resumeSource === "upload" && (
            <div className="mt-4">
              <Label htmlFor="resume-file" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      {uploadedFile ? (
                        <span className="text-green-600 font-medium">
                          {uploadedFile.name}
                        </span>
                      ) : (
                        <>
                          <span className="font-medium">Click to upload</span> or drag
                          and drop
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">PDF or DOCX (max 5MB)</p>
                  </div>
                </div>
              </Label>
              <Input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              {parsingFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Parsing resume file...
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide information about the position you're applying for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                className="h-32"
                {...register("jobDescription")}
              />
              {errors.jobDescription && (
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={generating || !resumeText}>
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Tailored Resume"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TailoredResumeGenerator;
