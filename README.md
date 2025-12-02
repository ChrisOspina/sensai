# Sensai AI

## Overview
Sensai AI is a Next.js-powered career coach that leverages machine learning to guide your job search, offering personalized insights and support to help you land your next opportunity.

The application contains the following features
* Industry Insights
* Resume Builder
* Interview Prep
* Cover Letter Generator

**Disclaimer** : The project was developed from a YouTube Tutorial via https://www.youtube.com/watch?v=UbXpRv5ApKA

### Technologies used
* Next.js
* Clerk
* Prisma DB
* Innggest AI
* PostgresSQL
* Google Gemini AI
* recharts
* ReactToPrint
* TailwindCSS

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

