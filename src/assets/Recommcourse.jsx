import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import YouTubeCard from "./YouTubeCard";

const Recommcourse = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [roadmapData, setRoadmapData] = useState([]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
      else setUser(user);
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    fetch("/youtubeRoadmaps.json")
      .then((res) => res.json())
      .then((data) => setRoadmapData(data));
  }, []);

  const roleRoadmap = roadmapData[selectedRole] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 py-10 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-purple-700 rounded-full blur-3xl opacity-25 top-16 left-20 animate-spin-slow" />
        <div className="absolute w-80 h-80 bg-indigo-600 rounded-full blur-2xl opacity-20 top-1/2 right-24 animate-pulse-slow" />
      </div>

      {/* Personalized Roadmap */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-4">
          📚 Free YouTube Roadmap Courses
        </h2>

        {/* Role Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.keys(roadmapData).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-full border transition ${
                selectedRole === role
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-transparent text-gray-300 border-gray-600 hover:border-indigo-400"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Topic-Wise YouTube Cards */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-1">
          {roleRoadmap.map((step, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow hover:shadow-xl transition mb-8"
            >
              <h3 className="text-2xl font-semibold text-indigo-300 mb-4">
                Step {index + 1}: {step.step}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {step.videos.map((video, idx) => (
                  <YouTubeCard key={idx} video={video} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommcourse;
