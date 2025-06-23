// src/api/fetchRoadmapFromGemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
let lastRequestTime = 0; // Timestamp of last request in milliseconds
const THROTTLE_DURATION = 6000; // 6 seconds (minimum delay between requests)

export const fetchRoadmapFromGemini = async (role) => {
  try {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    // Throttle: Wait if the last request was too recent
    if (timeSinceLastRequest < THROTTLE_DURATION) {
      const waitTime = THROTTLE_DURATION - timeSinceLastRequest;
      console.warn(`⏳ Throttling: Waiting ${waitTime}ms before sending request...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    lastRequestTime = Date.now(); // Update the last request time

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Give a concise 6-step roadmap to become a curated successful ${role}. Each step should be one short bullet point. Like this :
- Learn Node.js & Express
- Understand REST APIs
- Work with Databases
- Authentication (JWT, OAuth)
- Build & Deploy APIs
- Docker Basics`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract steps from response
    return text
      .split("\n")
      .map((line) => line.replace(/^\d+\.?\s*-?/, "").trim())
      .filter((line) => line.length > 0);
  } catch (err) {
    console.error("🔥 Gemini error:", err);
    return null;
  }
};
