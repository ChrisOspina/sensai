"use server";

import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkAuth } from "./check-auth";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

/**
 * Generate a tailored resume based on job description and original resume
 * @param {Object} data - { companyName, jobTitle, jobDescription, resumeText }
 * @returns {Promise<TailoredResume>}
 */
export async function generateTailoredResume(data) {
  const user = await checkAuth();

  const prompt = `You are an expert resume writer and career coach. Tailor the following resume for a ${data.jobTitle} position at ${data.companyName}.

Original Resume:
${data.resumeText}

Job Description:
${data.jobDescription}

About the candidate (if not already in resume):
- Industry: ${user.industry}
- Years of Experience: ${user.experience}
- Skills: ${user.skills?.join(", ")}
- Professional Background: ${user.bio}

Requirements:
1. Keep all factual information accurate - DO NOT fabricate experience, skills, or achievements
2. Emphasize relevant skills, experience, and achievements that match the job description
3. Reorder or reorganize sections to highlight the most relevant qualifications first
4. Optimize keywords from the job description (for ATS compatibility)
5. Tailor the professional summary to align with the job requirements
6. Highlight transferable skills if the candidate is changing industries
7. Keep the resume concise and impactful (ideally 1-2 pages)
8. Use action verbs and quantifiable achievements where possible
9. Maintain professional formatting in markdown
10. Focus on accomplishments that demonstrate value for this specific role

Format the tailored resume in markdown with proper sections:
- Contact Information
- Professional Summary
- Skills
- Work Experience
- Education
- Projects (if applicable)

Return ONLY the tailored resume content in markdown format.
`;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const tailoredResume = await db.tailoredResume.create({
      data: {
        content,
        originalResume: data.resumeText,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return tailoredResume;
  } catch (error) {
    console.error("Error generating tailored resume:", error.message);
    throw new Error("Failed to generate tailored resume");
  }
}

/**
 * Get all tailored resumes for the authenticated user
 * @returns {Promise<TailoredResume[]>}
 */
export async function getTailoredResumes() {
  const user = await checkAuth();

  return await db.tailoredResume.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

/**
 * Get a specific tailored resume by ID
 * @param {string} id - Tailored resume ID
 * @returns {Promise<TailoredResume>}
 */
export async function getTailoredResume(id) {
  const user = await checkAuth();

  return await db.tailoredResume.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

/**
 * Delete a tailored resume by ID
 * @param {string} id - Tailored resume ID
 * @returns {Promise<TailoredResume>}
 */
export async function deleteTailoredResume(id) {
  const user = await checkAuth();

  return await db.tailoredResume.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}

/**
 * Get the user's existing resume from the database
 * @returns {Promise<Resume|null>}
 */
export async function getUserResume() {
  const user = await checkAuth();

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

/**
 * Parse an uploaded resume file (PDF or DOCX) and return the text content
 * @param {FormData} formData - FormData containing the file
 * @returns {Promise<{text: string}>}
 */
export async function parseResumeFile(formData) {
  await checkAuth(); // Ensure user is authenticated

  const file = formData.get("file");

  if (!file) {
    throw new Error("No file provided");
  }

  // Dynamic imports for file parsing libraries
  const pdfParse = (await import("pdf-parse")).default;
  const mammoth = await import("mammoth");

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileType = file.type;

  try {
    let text = "";

    if (fileType === "application/pdf") {
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else {
      throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
    }

    if (!text || text.trim().length === 0) {
      throw new Error("No text content found in the file");
    }

    return { text };
  } catch (error) {
    console.error("Error parsing resume file:", error);
    throw new Error(`Failed to parse resume file: ${error.message}`);
  }
}
