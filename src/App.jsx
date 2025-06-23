import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./assets/Navbar";
import Login from "./assets/Login";
import Signup from "./assets/Signup";
import Dashboard from "./assets/Dashboard";
import Roadmap from "./assets/Roadmap";
import Recommcourse from "./assets/Recommcourse";
import TestGemini from "./TestGemini"
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/roadmap" element={<Roadmap />}/>
        <Route path="/test-gemini" element={<TestGemini />} />
        <Route path="/free-courses" element={<Recommcourse/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
