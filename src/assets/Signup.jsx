import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
          <h2 >
        <p className=" text-indigo-400 text-center p-10 text-5xl tracking-wide py-1.5">
  Empowering future leaders. <div className="text-white font-medium 
  ">Build your career roadmap today with CareerBaat 🚀</div>
</p>
        </h2>
      <form
        className="w-full max-w-md bg-black bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-xl shadow-xl p-8"
        onSubmit={handleSignup}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Create your CareerBaat account
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
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Signup;
