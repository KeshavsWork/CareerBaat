// src/pages/Roadmap.jsx
import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchRoadmapFromGemini } from "../api/fetchRoadmapFromGemini.js"; // ✅

const roles = ["Frontend Developer", "Backend Developer", "DevOps Engineer", "Full Stack Developer", "AI/ML Engineer"];

const roadmapData = {
  "Frontend Developer": [
    "Learn HTML & CSS",
    "Master JavaScript (ES6+)",
    "Understand Git & GitHub",
    "Dive into ReactJS",
    "Learn Responsive Design",
    "Deploy with Vercel or Netlify",
  ],
  "Backend Developer": [
    "Learn Node.js & Express",
    "Understand REST APIs",
    "Work with Databases",
    "Authentication (JWT, OAuth)",
    "Build & Deploy APIs",
    "Docker Basics",
  ],
  "DevOps Engineer": [
    "Linux & Shell Scripting",
    "CI/CD with Jenkins or GitHub Actions",
    "Docker & Kubernetes",
    "AWS/GCP Basics",
    "Monitoring & Logging",
    "Infrastructure as Code (Terraform)",
  ],
  "Full Stack Developer": [
    "Frontend + Backend Foundations",
    "React + Node.js",
    "Database Integration (MongoDB)",
    "Authentication & Security",
    "Version Control & CI/CD",
    "Cloud Deployment",
  ],
  "AI/ML Engineer": [
    "Python, NumPy, Pandas",
    "Data Preprocessing",
    "Scikit-learn Algorithms",
    "Deep Learning (PyTorch/TensorFlow)",
    "Model Evaluation",
    "Deployment of ML Models",
  ],
};

const Roadmap = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [customRole, setCustomRole] = useState("");
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);

  const finalRole = customRole || selectedRole;

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
      else setUser(user);
    });
    return () => unsub();
  }, [navigate]);

  // 🔄 Update steps if custom role or selected role changes
  useEffect(() => {
    const loadSteps = async () => {

      if (roadmapData[finalRole]) {
        setSteps(roadmapData[finalRole]);
        return;
      }

      // 🚀 Use Gemini for AI-generated roadmap
      setLoading(true);
      const aiSteps = await fetchRoadmapFromGemini(finalRole);
      setSteps(aiSteps || []);
      setLoading(false);
    };
    loadSteps();
  }, [selectedRole, customRole]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-400 text-center mb-2">
          {finalRole} Roadmap
        </h1>
        <p className="text-center text-gray-300 mb-6 text-lg">
          Select or search a role to begin your journey.
        </p>

        {/* 🔘 Role Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => {
                setSelectedRole(role);
                setCustomRole("");
              }}
              className={`px-4 py-2 rounded-full border transition ${
                finalRole === role && !customRole
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-transparent text-gray-300 border-gray-600 hover:border-indigo-400"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* 🔍 Custom Role Search */}
        <div className="text-center mb-10">
          <input
            type="text"
            placeholder="Search or enter a custom role (e.g., Cybersecurity Expert)"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            className="w-full max-w-lg px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-indigo-500"
          />
          {customRole && !roadmapData[customRole] && (
            <p className="mt-2 text-sm text-yellow-400 italic">
              AI-generated roadmap from CareerBaat ✨
            </p>
          )}
        </div>

        {/* 🗺️ Roadmap Steps */}
        {loading ? (
          <p className="text-center text-indigo-400">Loading roadmap from CareerbBaat...</p>
        ) : (
          <motion.div
            key={finalRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                  Step {index + 1}
                </h3>
                <p className="text-gray-400">{step}</p>
              </div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => alert("Learning page coming soon!")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg transition"
          >
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
