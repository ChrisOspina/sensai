import pdfParse from "pdf-parse";
import mammoth from "mammoth";

/**
 * Parse uploaded resume file (PDF or DOCX) and extract text content
 * @param {File} file - The uploaded file
 * @returns {Promise<string>} - Extracted text content
 */
export async function parseResumeFile(file) {
  const fileType = file.type;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    if (fileType === "application/pdf") {
      // Parse PDF
      const data = await pdfParse(buffer);
      return data.text;
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      // Parse DOCX
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else {
      throw new Error(
        "Unsupported file type. Please upload a PDF or DOCX file."
      );
    }
  } catch (error) {
    console.error("Error parsing file:", error);
    throw new Error(`Failed to parse resume file: ${error.message}`);
  }
}

/**
 * Validate file size and type
 * @param {File} file - The uploaded file
 * @param {number} maxSizeMB - Maximum file size in MB (default 5MB)
 * @returns {Object} - { valid: boolean, error?: string }
 */
export function validateResumeFile(file, maxSizeMB = 5) {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
  ];

  if (!file) {
    return { valid: false, error: "No file selected" };
  }

  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Invalid file type. Please upload a PDF or DOCX file",
    };
  }

  return { valid: true };
}
