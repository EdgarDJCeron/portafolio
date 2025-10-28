import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Envuelve componentes que requieren login.
 * Si no hay token, redirige a /login.
 */
export default function ProtectedRoute({ children }) {
  const { token, cargando } = useAuth();

  if (cargando) {
    return <div className="p-6">Cargando...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
