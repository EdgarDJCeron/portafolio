import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function manejarSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login({ email, contraseña });
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={manejarSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">Iniciar sesión</h1>

        {error && <div className="p-2 text-sm bg-red-100 text-red-700 rounded">{error}</div>}

        <label className="block">
          <span className="text-sm">Correo</span>
          <input
            type="email"
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="admin@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm">Contraseña</span>
          <input
            type="password"
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="••••••"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-600 text-white rounded py-2 font-semibold disabled:opacity-60"
        >
          {cargando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
