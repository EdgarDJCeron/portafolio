import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../services/api";

export default function ProyectoDetalle() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch(`/api/proyectos/${id}`);
        setProyecto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    })();
  }, [id]);

  if (cargando) return <div className="p-6">Cargando...</div>;
  if (error) return <div className="p-6 text-red-700">{error}</div>;
  if (!proyecto) return <div className="p-6">Proyecto no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {proyecto.imagenDestacada && (
        <img
          src={proyecto.imagenDestacada}
          alt={proyecto.titulo}
          className="w-full rounded mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{proyecto.titulo}</h1>
      <p className="text-gray-700 mb-4">{proyecto.descripcion}</p>
      <div className="flex gap-3">
        {proyecto.urlRepositorio && (
          <a
            href={proyecto.urlRepositorio}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded bg-gray-800 text-white"
          >
            Repositorio
          </a>
        )}
        {proyecto.urlDemo && (
          <a
            href={proyecto.urlDemo}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
