import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../services/api";

// Crea un contexto para compartir auth (usuario + token)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al montar, lee token guardado
  useEffect(() => {
    const tk = localStorage.getItem("token");
    const usu = localStorage.getItem("usuario");
    if (tk && usu) {
      setToken(tk);
      try {
        setUsuario(JSON.parse(usu));
      } catch {
        localStorage.removeItem("usuario");
      }
    }
    setCargando(false);
  }, []);

  // Login real contra /api/auth/login
  async function login({ email, contraseña }) {
    const data = await apiFetch("/api/auth/login", {
      metodo: "POST",
      cuerpo: { email, contraseña },
    });
    // data: { mensaje, token, usuario }
    setToken(data.token);
    setUsuario(data.usuario);
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    return data.usuario;
  }

  function logout() {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }

  const valor = { usuario, token, cargando, login, logout };
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
