// src/components/Trayectoria.jsx
import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../services/api";

const PRIMARY = "#007BFF";

export default function Trayectoria() {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await apiFetch("/api/experiencia"); // público
        setItems(data);
      } catch (e) {
        setError(e.message || "Error al cargar trayectoria");
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  const ordenados = useMemo(() => {
    // ya vienen ordenados por API; alternamos lados por índice
    return items.map((it, idx) => ({ ...it, _lado: idx % 2 === 0 ? "derecha" : "izquierda" }));
  }, [items]);

  return (
    <section id="trayectoria" className="bg-[#101922] text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Mi Trayectoria</h2>
          <p className="mt-2 text-lg text-gray-400">
            Un resumen de mi experiencia profesional y formación académica.
          </p>
        </div>

        {error && (
          <div className="mx-auto max-w-xl mb-8 p-3 border border-red-400 text-red-200 rounded">
            {error}
          </div>
        )}

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-gray-700 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {cargando
              ? [0, 1, 2].map((i) => <SkeletonLinea key={i} />)
              : ordenados.map((it) => (
                  <LineaTiempoItem
                    key={it._id}
                    lado={it._lado}
                    icono={it.tipo === "education" ? "school" : "work"}
                    fecha={formatRango(it.fechaInicio, it.fechaFin, it.actual)}
                    titulo={it.titulo}
                    empresa={it.empresa}
                    bullets={it.bullets || []}
                    tags={it.etiquetas || []}
                    iconoSuave={it.tipo === "education"}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------- Subcomponentes ------- */

function LineaTiempoItem({
  lado = "derecha",
  icono = "work",
  fecha,
  titulo,
  empresa,
  bullets = [],
  tags = [],
  iconoSuave = false,
}) {
  const derecha = lado === "derecha";
  const colIzq = "md:w-1/2 md:pr-8 md:text-right flex md:justify-end";
  const colDer = "md:w-1/2 md:pl-8 md:text-left flex md:justify-start";
  const contFechaIzq = "relative md:text-right";
  const contFechaDer = "relative";

  const Bubble = (
    <div
      className={`absolute ${
        derecha
          ? "md:right-full md:-top-1.5 md:mr-10 left-0 -top-1"
          : "md:left-full md:-top-1.5 md:ml-10 left-0 -top-1"
      } z-10`}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center ring-8"
        style={{
          backgroundColor: iconoSuave ? `${PRIMARY}CC` : PRIMARY,
          // el ring hereda del fondo de la sección (oscuro)
          boxShadow: "0 0 0 0 transparent",
        }}
      >
        <span className="material-symbols-outlined text-white">{icono}</span>
      </div>
    </div>
  );

  return (
    <div
      className={`relative flex flex-col ${
        derecha ? "md:flex-row" : "md:flex-row-reverse"
      } items-start md:gap-8`}
    >
      <div className={derecha ? colIzq : colDer}>
        <div className={derecha ? contFechaIzq : contFechaDer}>
          {Bubble}
          <p
            className="text-sm font-medium"
            style={{ color: iconoSuave ? `${PRIMARY}CC` : PRIMARY }}
          >
            {fecha}
          </p>
        </div>
      </div>

      <div
        className={`${derecha ? "md:w-1/2 md:pl-8" : "md:w-1/2 md:pr-8"} mt-4 md:mt-0 w-full ${
          derecha ? "text-left" : "text-left md:text-right"
        }`}
      >
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-bold text-white">{titulo}</h3>
          <p className="text-md text-gray-400 mt-1 mb-4">{empresa}</p>

          <ul
            className={`text-sm text-gray-300 space-y-2 ${
              derecha ? "" : "md:list-none md:text-right"
            } list-disc list-inside`}
          >
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <div className={`mt-4 flex flex-wrap gap-2 ${derecha ? "" : "md:justify-end"}`}>
            {tags.map((t, i) => (
              <span
                key={i}
                className="rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{ backgroundColor: `${PRIMARY}1A`, color: PRIMARY }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------- Utils ------- */
function formatRango(inicio, fin, actual) {
  const y1 = yearOf(inicio);
  const y2 = actual ? "Presente" : yearOf(fin);
  return `${y1} - ${y2}`;
}
function yearOf(d) {
  if (!d) return "";
  try {
    return new Date(d).getFullYear();
  } catch {
    return "";
  }
}

/* ------- Skeleton ------- */
function SkeletonLinea() {
  return (
    <div className="relative flex flex-col md:flex-row items-start md:gap-8 opacity-60">
      <div className="md:w-1/2 md:pr-8 md:text-right flex md:justify-end">
        <div className="relative md:text-right">
          <div className="w-10 h-10 rounded-full bg-[#007BFF] ring-8" />
          <div className="h-4 w-24 bg-white/10 rounded mt-3 ml-12 md:ml-0" />
        </div>
      </div>
      <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0 w-full">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="h-5 w-64 bg-white/10 rounded mb-3" />
          <div className="h-4 w-48 bg-white/10 rounded mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded" />
            <div className="h-4 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
