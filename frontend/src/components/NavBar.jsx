// src/components/NavBar.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkBase = "px-3 py-2 rounded hover:bg-gray-100";
const brandClass = "text-xl font-bold";

export default function NavBar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function manejarLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <button
          onClick={() => scrollToId("hero")}
          className={brandClass}
          aria-label="Ir al inicio"
        >
          Mi Portafolio
        </button>

        <div className="flex items-center gap-2">
          <button onClick={() => scrollToId("sobre-mi")} className={linkBase}>Sobre mí</button>
          <button onClick={() => scrollToId("habilidades")} className={linkBase}>Habilidades</button>
          <button onClick={() => scrollToId("proyectos")} className={linkBase}>Proyectos</button>
          <button onClick={() => scrollToId("contacto")} className={linkBase}>Contacto</button>

          {usuario ? (
            <div className="flex items-center gap-2 ml-2">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {usuario.nombre} ({usuario.rol})
              </span>
              <button
                onClick={() => navigate("/admin")}
                className="px-3 py-2 rounded bg-gray-900 text-white"
              >
                Admin
              </button>
              <button
                onClick={manejarLogout}
                className="px-3 py-2 rounded bg-red-600 text-white"
              >
                Salir
              </button>
            </div>
          ) : (
            <button onClick={() => navigate("/login")} className={linkBase}>
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
