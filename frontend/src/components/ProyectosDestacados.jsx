// src/components/ProyectosDestacados.jsx
// Diseño idéntico al mockup + fetch real al backend (GET /api/proyectos)

import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { API_URL } from "../config";

const CLASE_CARD =
  "group relative flex flex-col overflow-hidden rounded-xl bg-[#1A202C] shadow-lg border border-white/10";
const CLASE_IMG =
  "aspect-[16/10] w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]";
const CLASE_OVERLAY =
  "absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out";
const CLASE_PILL =
  "rounded-full bg-[#3182CE]/20 px-3 py-1 text-xs font-medium text-[#3182CE]";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 400'>
      <defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#0f1a22'/><stop offset='1' stop-color='#13202a'/></linearGradient></defs>
      <rect width='100%' height='100%' fill='url(#g)'/>
    </svg>`
  );

export default function ProyectosDestacados() {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await apiFetch("/api/proyectos"); // públicos
        // Opcional: ordena por fecha desc si tu API ya devuelve createdAt
        setProyectos(data);
      } catch (e) {
        setError(e.message || "Error al cargar proyectos");
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  return (
    <section id="proyectos" className="bg-[#101922] text-white">
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-10 sm:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Título sección */}
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
            Proyectos Destacados
          </h2>

          {/* Errores */}
          {error && (
            <div className="mt-6 mx-auto max-w-xl rounded-lg border border-red-400 bg-red-100/10 text-red-200 p-3 text-sm">
              {error}
            </div>
          )}

          {/* Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {cargando
              ? Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : proyectos.map((p) => (
                  <ProjectCard key={p._id} proyecto={p} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Tarjeta de Proyecto (exacta al mockup) ---------- */
function ProjectCard({ proyecto }) {
  // La imagen puede venir de Cloudinary (URL completa) o del backend (/uploads)
  let img = proyecto.imagenDestacada || PLACEHOLDER;
  
  // Si la imagen empieza con /uploads, agregar la URL del backend (legacy)
  if (img && img.startsWith('/uploads')) {
    img = `${API_URL}${img}`;
  }
  // Si ya es una URL completa de Cloudinary, usarla tal cual
  // (las URLs de Cloudinary empiezan con https://res.cloudinary.com/)
  
  const pills = (proyecto.etiquetas || []).slice(0, 4); // muestra hasta 4 como en el mockup

  return (
    <article className={CLASE_CARD}>
      {/* Imagen con overlay de acciones */}
      <div className="relative">
        <img src={img} alt={proyecto.titulo} className={CLASE_IMG} />
        <div className={CLASE_OVERLAY}>
          <div className="flex items-center gap-4">
            {proyecto.urlDemo && (
              <a
                href={proyecto.urlDemo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#3182CE] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2a6db1]"
              >
                <span className="material-symbols-outlined text-base">link</span>
                Ver Proyecto
              </a>
            )}
            {proyecto.urlRepositorio && (
              <a
                href={proyecto.urlRepositorio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-gray-400 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-base">code</span>
                Ver Código
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-white">{proyecto.titulo}</h3>
        <p className="mt-2 text-sm text-[#A0AEC0] flex-grow">
          {proyecto.descripcion}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {pills.map((tag, i) => (
            <span key={i} className={CLASE_PILL}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ---------- Skeleton para carga ---------- */
function SkeletonCard() {
  return (
    <div className={`${CLASE_CARD} animate-pulse`}>
      <div className="aspect-[16/10] w-full bg-white/10" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="flex gap-2 pt-2">
          <span className="h-6 w-16 bg-white/10 rounded-full" />
          <span className="h-6 w-20 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
