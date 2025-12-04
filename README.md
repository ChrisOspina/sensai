# Sensai AI

## Overview
Sensai AI is a Next.js-powered career coach that leverages machine learning to guide your job search, offering personalized insights and support to help you land your next opportunity.

The application contains the following features
* Industry Insights
* Resume Builder
* Interview Prep
* Cover Letter Generator

**Disclaimer** : The project was developed from a YouTube Tutorial via https://www.youtube.com/watch?v=UbXpRv5ApKA but with Anispo branding

### Technologies used
* Next.js
* Clerk
* Neon DB
* Prisma DB
* Innggest AI
* PostgresSQL
* Google Gemini AI
* recharts
* ReactToPrint
* TailwindCSS
* ShadcnUI
* Vercel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Enviromnent variables may vary**
Some may require getting keys from Inggest, NeonDB and Google Gemini API to run locally

Note: * *The deployed version is on [anip.so](anip.so) with your browser. This will still require you to make an account with clerk authentication* *

## Industry Insights

<img width="1516" height="856" alt="image" src="https://github.com/user-attachments/assets/98d97055-2685-4b5a-8de6-221f9e9a0bc0" />

After completing onboarding, users are prompted to select their industry and corresponding sub-industries. Based on this input, the Inngest database retrieves the following via dashboard:
- Relevant sub-skills associated with the chosen industry
- Current market growth rates
- Demand levels for roles within the industry
- Typical salary ranges segmented by role

**The dashbaord page could either be accessed by logging in to Sensai or clicking on the industry insights tab.

## Resume Builder

<img width="1558" height="780" alt="image" src="https://github.com/user-attachments/assets/c88f5db2-28ed-427b-a97f-6620e9315021" />

This section allows the user to create a resume which could be printed or downloaded via PDF

There are two ways the user could create their resume.

1. Form input
2. Markdown editor

### Form editor

The first section prompts the user to input their contact information. This includes:
- Email
- Mobile Number
- LindkedIn profile Url
- Twitter Profile (optional)

The second section is a text editior which prompts the user to draft a professional summary followed by one to list relevant skills.

The Third section contains a sub form that prompts the user to input relevant work expierence, with fields for:
- Title/Position
- Company
- Start Date
- End Date
- Job Description

The Fourth section is similar but for education with fields containing:
 - Degree
 - School Name
 - Start Date
 - End Date
 - Description

The Fifth section is the same for projects
 - Project name
 - Description
 - Start Date
 - End Date

**Note: The descriptions could be edited with AI**

## Interview Prep

<img width="1677" height="824" alt="image" src="https://github.com/user-attachments/assets/c268f8e3-0005-427c-83bd-6ca46ac7310f" />

This section allows users to test their knowledge of industry insights and skills by completing practice interview quizzes. The Inngest service automatically generates a score along with feedback to help users identify areas for improvement.
The accompanying dashboard provides a clear overview of user performance, including:
- Total Questions Practiced – cumulative count of attempted quiz questions
- Average Score – overall performance across all quizzes
- Latest Score – most recent quiz result
- Performance Trend – progress visualization over time
- Recent Quizzes – history of the latest completed quizzes


## Cover Letter Generator
<img width="1881" height="748" alt="image" src="https://github.com/user-attachments/assets/6f3a0d83-d35c-4bac-8045-94fa28c57fc3" />

With Anipso Systems and the Inngest AI connector, users can generate tailored cover letters directly within our career-certified platform—eliminating the need for generic templates or manual drafting.
Workflow:
- Enter the company name
- Provide the position title
- Paste the job description into the text box
Within moments, the AI produces a customized cover letter aligned to the target role. The generated document is automatically stored in the Neon Database and can be printed or downloaded for personal use.


## System Archictecture Diagram

The architecture diagram illustrates how different components of the AI career coach interact:

<img width="1536" height="1024" alt="Architecture diagram" src="https://github.com/user-attachments/assets/041bb3b1-8114-496b-9e08-4ddc3c92793e" />

Components
- User: The end-user accessing the platform via a web or mobile client.
- Frontend Client: The user interface built with modern web technologies, responsible for collecting input and displaying AI-driven insights.
- Backend Server: Handles business logic, API routing, and orchestrates communication between services.
- Prisma Database: Stores user profiles, assessments, resumes, cover letters, and industry insights. Also serves as a data source for AI prompts.
- Google Gemini API: Provides AI capabilities such as resume feedback, interview coaching, and skill recommendations.
- Inngest: Manages background tasks and event-driven workflows (e.g., scoring assessments, scheduling updates).
Flow
- Users interact with the Frontend Client.
- The client sends requests to the Backend Server.
- The server queries the Prisma Database and optionally invokes the Google Gemini API for AI responses.
- Inngest handles asynchronous tasks like generating improvement tips or updating industry insights.

<hr/>

## Class Diagram for Prisma Database

This UML-style class diagram outlines the relational structure of the Prisma schema:

<img width="1536" height="1024" alt="class diagram" src="https://github.com/user-attachments/assets/1a670803-600f-4028-b914-2e2da142db5a" />


### Key Models
#### User
- Stores personal info, skills, experience, and links to assessments, resume, and cover letters.
- Optionally linked to an IndustryInsight for contextual career data.
#### Assessment
- Contains quiz results, categorized by type (e.g., technical, behavioral).
- Includes AI-generated feedback and question-level analytics.
#### Resume
- One-to-one relationship with User.
- Stores markdown content, ATS score, and feedback.
#### CoverLetter
- One-to-many relationship with User.
- Tracks job-specific letters, status (draft/completed), and metadata.
- IndustryInsight
- Aggregates industry-level data like salary ranges, growth rate, demand level, and recommended skills.
- Linked to multiple users via the industry field.
### Enums
- DemandLevel: HIGH, MEDIUM, LOW
- MarketOutlook: POSITIVE, NEUTRAL, NEGATIVE




