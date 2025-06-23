import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

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
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-3">
      <h2 >
        <p className=" text-indigo-400 text-center p-10 text-5xl tracking-wide">
  Empowering future leaders. <div className="text-white font-medium">Build your career roadmap today with CareerBaat 🚀</div>
</p>
        </h2>
      <form
        className="w-full max-w-md justify-center items-center bg-black bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl p-8 "
        onSubmit={handleLogin}
      >
        
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Login to CareerBaat
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-gray-800 text-white border border-gray-600 p-3 mb-4 rounded-lg focus:outline-none focus:border-indigo-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-gray-800 text-white border border-gray-600 p-3 mb-6 rounded-lg focus:outline-none focus:border-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
