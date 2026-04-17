# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sensai AI is a Next.js 15 career coaching application that provides AI-powered job search tools including industry insights, resume building, interview preparation, cover letter generation, and resume tailoring. Built with the App Router architecture, it uses Google Gemini for AI generation, Clerk for authentication, PostgreSQL (Neon) for data persistence via Prisma ORM, and Inngest for background job processing.

## Commands

### Development
```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma generate                    # Generate Prisma client (auto-runs on npm install)
npx prisma migrate dev --name <name>   # Create and apply migration
npx prisma studio                      # Open Prisma Studio GUI
npx prisma db push                     # Push schema changes without migration
```

### Inngest
```bash
npx inngest-cli dev  # Start Inngest dev server for background jobs (optional)
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router) with React 19
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **Authentication**: Clerk
- **AI**: Google Gemini (gemini-flash-latest model)
- **Background Jobs**: Inngest
- **UI**: TailwindCSS 4 + ShadcnUI components
- **Forms**: React Hook Form + Zod validation
- **Markdown**: @uiw/react-md-editor
- **File Parsing**: pdf-parse, mammoth (for resume uploads)

### Directory Structure

```
app/
  (main)/              # Protected routes (requires auth)
    dashboard/         # Industry insights dashboard
    resume/            # Resume builder (one per user)
    cover-letter/      # Cover letter generator (multiple per user)
    resume-tailor/     # Resume tailoring feature (multiple per user)
    interview/         # Interview prep quizzes
    onboarding/        # Initial user setup
  lib/
    schema.js          # Zod validation schemas
    helper.js          # Utility functions (e.g., entriesToMarkdown)
    file-parser.js     # Resume file parsing utilities
actions/               # Server actions
  check-auth.js        # Authentication helper
  cover-letter.js      # Cover letter CRUD operations
  tailor-resume.js     # Resume tailoring operations
  resume.js            # Resume builder operations
lib/
  prisma.js            # Prisma client singleton
  inngest/             # Inngest client and functions
    client.js
    functions.js
hooks/
  use-fetch.js         # Custom hook for server action calls
prisma/
  schema.prisma        # Database schema
```

### Key Patterns

#### Server Actions Pattern
All server actions follow this structure:
1. Start with `"use server"` directive
2. Use `checkAuth()` helper to verify authentication and get user
3. Perform database operations via `db` (Prisma client from `@/lib/prisma`)
4. For AI generation: use Google Gemini model with structured prompts
5. Return data or throw descriptive errors

```javascript
"use server";
import { db } from "@/lib/prisma";
import { checkAuth } from "./check-auth";

export async function myAction(data) {
  const user = await checkAuth();

  try {
    const result = await db.model.create({ data: {...} });
    return result;
  } catch (error) {
    throw new Error("Failed to...");
  }
}
```

#### Client Component Pattern
Components that handle user interactions:
1. Mark with `"use client"` directive
2. Use `useForm` with `zodResolver` for form validation
3. Use `useFetch` custom hook to call server actions
4. Handle success/error states with `useEffect` and `toast` notifications
5. Navigate with `useRouter` on success

```javascript
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";

const { loading, fn, data } = useFetch(serverAction);
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(mySchema),
});

useEffect(() => {
  if (data) {
    toast.success("Success!");
    router.push(`/route/${data.id}`);
  }
}, [data]);
```

#### Page Routing Pattern
- **List pages**: Server components that fetch data and pass to client components
- **Detail pages**: Server components that fetch single item by ID
- **Form pages**: Import and render client form components

#### AI Prompt Structure
When generating AI content with Gemini:
- Include user context (industry, experience, skills, bio)
- Provide clear input data (job description, resume content, etc.)
- List explicit requirements (tone, length, format)
- Specify output format (markdown, JSON, etc.)

### Database Schema

#### Key Models & Relationships
- **User**: One-to-one with Resume, one-to-many with CoverLetter, TailoredResume, Assessment
- **Resume**: User's base resume (markdown content)
- **CoverLetter**: AI-generated cover letters for job applications
- **TailoredResume**: AI-tailored resumes based on job descriptions
- **Assessment**: Interview prep quiz results
- **IndustryInsight**: Cached industry data (salary, growth, skills)

#### Prisma Client Location
Generated Prisma client is at `./lib/generated/prisma` (non-standard location). Import via:
```javascript
import { db } from "@/lib/prisma";
```

### Authentication

Routes are protected by Clerk middleware (`middleware.js`):
- Protected route matcher includes: `/dashboard`, `/resume`, `/cover-letter`, `/interview`, `/resume-tailor`, `/onboarding`
- Use `checkAuth()` helper in server actions to get authenticated user

### Environment Variables Required

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=postgresql://...

# Google Gemini AI
GEMINI_API_KEY=

# Inngest
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
```

### Markdown & Resume Features

#### Resume Builder
- Uses `EntryForm` component for repeatable sections (experience, education, projects)
- Converts form data to markdown using `entriesToMarkdown` helper
- AI-powered description improvement via `improveWithAI` action
- Supports both form input and markdown editor modes (tabs)
- One resume per user (upsert pattern)

#### Cover Letter & Tailored Resume
- Multiple documents per user
- AI-generated based on job description + user profile
- Stored as markdown in database
- Preview with MDEditor component
- Print/PDF export via react-to-print (browser print dialog)

#### File Upload (Resume Tailoring)
- Accepts PDF and DOCX files (max 5MB)
- Server-side parsing with pdf-parse and mammoth libraries
- Parse action: `parseResumeFile` in `actions/tailor-resume.js`
- User can choose between uploading file or using existing resume

### Custom Hooks

#### useFetch
Located at `hooks/use-fetch.js`. Wraps server actions with loading/error states:
```javascript
const { data, loading, error, fn, setData } = useFetch(serverAction);
await fn(arg1, arg2);  // Call the server action
```

### Inngest Background Jobs

Inngest handles background processing for:
- Industry insights data generation and caching
- Assessment scoring and feedback generation

Client: `lib/inngest/client.js`
Functions: `lib/inngest/functions.js`

### UI Components

ShadcnUI components are used throughout:
- Forms: Input, Textarea, Label, Select, RadioGroup
- Layout: Card, Tabs, Accordion
- Feedback: Button, Dialog, AlertDialog, Progress
- Navigation: DropdownMenu
- Notifications: toast from sonner

### Common Development Patterns

#### Adding a New Feature (Following Cover Letter/Resume Tailor Pattern)
1. Add Prisma model to `schema.prisma`
2. Run `npx prisma migrate dev --name <feature_name>`
3. Create server actions in `actions/<feature>.js`
4. Create Zod schema in `app/lib/schema.js`
5. Create components in `app/(main)/<feature>/components/`
6. Create route pages: list, new, [id]
7. Update middleware if route needs auth protection

#### Date Formatting
Use `date-fns` for consistent date display:
```javascript
import { format } from "date-fns";
format(new Date(date), "PPP")  // Dec 3, 2024
```

#### Form Data to Markdown
Use `entriesToMarkdown` helper from `app/lib/helper.js` to convert arrays of entries (experience, education, projects) to markdown format.

## Notes

- Prisma client output path is custom: `./lib/generated/prisma`
- The project follows a clear separation: Server Components for data fetching, Client Components for interactivity
- All user-generated content is stored as markdown
- AI prompts include user profile data for personalization
- react-to-print uses browser's native print dialog (not true PDF generation)
