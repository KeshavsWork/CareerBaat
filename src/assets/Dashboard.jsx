import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RoleSelector from "../assets/RoleSelector";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
      else setUser(user);
    });
    return () => unsub();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background Motion Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-purple-700 rounded-full blur-3xl opacity-25 top-16 left-20 animate-spin-slow" />
        <div className="absolute w-80 h-80 bg-indigo-600 rounded-full blur-2xl opacity-20 top-1/2 right-24 animate-pulse-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto bg-black bg-opacity-60 backdrop-blur-md rounded-2xl shadow-lg p-8 gap-4"
      >
        <h1 className="text-5xl font-bold text-indigo-400 text-center mb-5">
          👋 Welcome, {user?.email?.split("@")[0]}!
        </h1>
        <p className="text-center text-gray-300 py-3 mb-6 text-2xl">
          You’ve logged into <span className="font-semibold text-indigo-300">CareerBaat</span> – your AI-powered career buddy.
        </p>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-6"
        >
          <p className="text-3xl font-medium text-white mb-9">
            🚀 Ready to begin your journey?
          </p>
          <button
            onClick={() => navigate("/roadmap")}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-semibold rounded-full shadow-md transition duration-300"
          >
            Start Your Roadmap Now
          </button>
        </motion.div>

        {/* RoleSelector */}
        {/* <div className="mt-10">
          <RoleSelector />
        </div> */}
      </motion.div>
    </div>
  );
};

export default Dashboard;
