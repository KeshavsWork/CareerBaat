// src/pages/TestGemini.jsx
import { useEffect } from "react";
import { fetchRoadmapFromGemini } from "./api/fetchRoadmapFromGemini";

const TestGemini = () => {
  useEffect(() => {
    fetchRoadmapFromGemini("Data Scientist").then(console.log);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Testing Gemini... Check console.
    </div>
  );
};

export default TestGemini;
