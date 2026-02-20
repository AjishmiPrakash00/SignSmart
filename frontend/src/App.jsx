import { Routes, Route, Navigate } from "react-router-dom";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Chatbot />
    </>
  );
}