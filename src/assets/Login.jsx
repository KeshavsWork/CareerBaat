import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-3">

      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-indigo-400 text-center p-10 text-5xl tracking-wide leading-snug">
          Empowering future leaders.{" "}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white font-medium"
          >
            Build your career roadmap today with CareerBaat 🚀
          </motion.div>
        </p>
      </motion.h2>

      {/* Animated Form */}
      <motion.form
        className="w-full max-w-md justify-center items-center bg-black bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl p-8"
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-indigo-400 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Login to CareerBaat
        </motion.h2>

        <motion.input
          type="email"
          placeholder="Email"
          className="w-full bg-gray-800 text-white border border-gray-600 p-3 mb-4 rounded-lg focus:outline-none focus:border-indigo-500"
          onChange={(e) => setEmail(e.target.value)}
          whileFocus={{ scale: 1.02 }}
        />
        <motion.input
          type="password"
          placeholder="Password"
          className="w-full bg-gray-800 text-white border border-gray-600 p-3 mb-6 rounded-lg focus:outline-none focus:border-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Login;
