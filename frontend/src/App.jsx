// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
// import NavBar from "./components/NavBar.jsx"; // ❌ quítalo

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* <NavBar />  ❌ quítalo para que no se vea arriba del Hero */}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<div className="p-6">404 — Página no encontrada</div>} />
      </Routes>
    </div>
  );
}
