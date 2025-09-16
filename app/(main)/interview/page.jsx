//import { getAssessments } from "@/actions/interview";
import React from "react";
import StatsCards from "./components/stats-cards";
import PerformanceChart from "./components/performance-chart";
import QuizList from "./components/quiz-list";

//const assessments = await getAssessments();

const InterviewPage = async () => {
  return (
    <div>
      <h1 className="text-6xl font-bold gradient-title mb-5">
        Interview Prepartation
      </h1>

      <div>
        <StatsCards />
        <PerformanceChart />
        <QuizList />
      </div>
    </div>
  );
};

export default InterviewPage;
