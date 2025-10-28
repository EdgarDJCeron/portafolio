import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";
import toast from "react-hot-toast";


const estadoInicialProyecto = {
  titulo: "",
  descripcion: "",
  urlRepositorio: "",
  urlDemo: "",
  etiquetas: "",
  imagenDestacada: "",
  publicado: true,
};

const estadoInicialArchivoImagen = {
  archivo: null,
  previsualizacion: null,
};

const estadoInicialExperiencia = {
  tipo: "work",
  titulo: "",
  empresa: "",
  ubicacion: "",
  fechaInicio: "",
  fechaFin: "",
  actual: false,
  bullets: "",
  etiquetas: "",
  publicado: true,
  orden: 0,
};

export default function Admin() {
  const { token } = useAuth();
  
  // Estados para proyectos
  const [proyectos, setProyectos] = useState([]);
  const [cargandoProyectos, setCargandoProyectos] = useState(true);
  const [errorProyectos, setErrorProyectos] = useState("");
  const [formProyecto, setFormProyecto] = useState(estadoInicialProyecto);
  const [editIdProyecto, setEditIdProyecto] = useState(null);
  const [imagenProyecto, setImagenProyecto] = useState(estadoInicialArchivoImagen);
  
  // Estados para experiencias
  const [experiencias, setExperiencias] = useState([]);
  const [cargandoExperiencias, setCargandoExperiencias] = useState(true);
  const [errorExperiencias, setErrorExperiencias] = useState("");
  const [formExperiencia, setFormExperiencia] = useState(estadoInicialExperiencia);
  const [editIdExperiencia, setEditIdExperiencia] = useState(null);
  
  // Estado para pestañas
  const [tabActiva, setTabActiva] = useState("proyectos");

  // ========== FUNCIONES PROYECTOS ==========
  async function cargarProyectos() {
    try {
      setErrorProyectos("");
      setCargandoProyectos(true);
      const data = await apiFetch("/api/proyectos/admin", { token });
      setProyectos(data);
    } catch (err) {
      setErrorProyectos(err.message || "Error al cargar proyectos");
    } finally {
      setCargandoProyectos(false);
    }
  }
  
  // ========== FUNCIONES EXPERIENCIAS ==========
  async function cargarExperiencias() {
    try {
      setErrorExperiencias("");
      setCargandoExperiencias(true);
      const data = await apiFetch("/api/experiencia/admin", { token });
      setExperiencias(data);
    } catch (err) {
      setErrorExperiencias(err.message || "Error al cargar experiencias");
    } finally {
      setCargandoExperiencias(false);
    }
  }

  useEffect(() => {
    cargarProyectos();
    cargarExperiencias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    if (tabActiva === "proyectos") {
      setFormProyecto((f) => ({
        ...f,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else {
      setFormExperiencia((f) => ({
        ...f,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  }

  function onChangeImagen(e) {
    const file = e.target.files[0];
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith('image/')) {
        toast.error('Por favor selecciona un archivo de imagen');
        return;
      }
      
      // Crear previsualización
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenProyecto({
          archivo: file,
          previsualizacion: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  function eliminarImagenSeleccionada() {
    setImagenProyecto(estadoInicialArchivoImagen);
    setFormProyecto(f => ({ ...f, imagenDestacada: "" }));
  }

  // ========== CRUD PROYECTOS ==========
  async function crearProyecto(e) {
    e.preventDefault();
    try {
      let urlImagen = formProyecto.imagenDestacada;

      // Si hay una imagen seleccionada, subirla primero
      if (imagenProyecto.archivo) {
        const formData = new FormData();
        formData.append('imagen', imagenProyecto.archivo);

        const respuesta = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!respuesta.ok) {
          throw new Error('Error al subir la imagen');
        }

        const data = await respuesta.json();
        urlImagen = data.url;
      }

      const cuerpo = {
        ...formProyecto,
        imagenDestacada: urlImagen,
        etiquetas: formProyecto.etiquetas
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      };
      
      await apiFetch("/api/proyectos", {
        metodo: "POST",
        cuerpo,
        token,
      });
      
      setFormProyecto(estadoInicialProyecto);
      setImagenProyecto(estadoInicialArchivoImagen);
      await cargarProyectos();
      toast.success("Proyecto creado");
    } catch (err) {
      toast.error(err.message || "Error al crear");
    }
  }

  async function seleccionarEditar(p) {
    setEditIdProyecto(p._id);
    setFormProyecto({
      titulo: p.titulo || "",
      descripcion: p.descripcion || "",
      urlRepositorio: p.urlRepositorio || "",
      urlDemo: p.urlDemo || "",
      etiquetas: (p.etiquetas || []).join(", "),
      imagenDestacada: p.imagenDestacada || "",
      publicado: !!p.publicado,
    });
    setImagenProyecto(estadoInicialArchivoImagen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function guardarEdicion(e) {
    e.preventDefault();
    try {
      let urlImagen = formProyecto.imagenDestacada;

      // Si hay una nueva imagen seleccionada, subirla primero
      if (imagenProyecto.archivo) {
        const formData = new FormData();
        formData.append('imagen', imagenProyecto.archivo);

        const respuesta = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!respuesta.ok) {
          throw new Error('Error al subir la imagen');
        }

        const data = await respuesta.json();
        urlImagen = data.url;
      }

      const cuerpo = {
        ...formProyecto,
        imagenDestacada: urlImagen,
        etiquetas: formProyecto.etiquetas
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      };
      
      await apiFetch(`/api/proyectos/${editIdProyecto}`, {
        metodo: "PUT",
        cuerpo,
        token,
      });
      
      setEditIdProyecto(null);
      setFormProyecto(estadoInicialProyecto);
      setImagenProyecto(estadoInicialArchivoImagen);
      await cargarProyectos();
      toast.success("Proyecto actualizado");
    } catch (err) {
      toast.error(err.message || "Error al actualizar");
    }
  }

  async function eliminarProyecto(id) {
    if (!confirm("¿Eliminar este proyecto?")) return;
    try {
      await apiFetch(`/api/proyectos/${id}`, {
        metodo: "DELETE",
        token,
      });
      await cargarProyectos();
      toast.success("Proyecto eliminado");
    } catch (err) {
      toast.error(err.message || "Error al eliminar");
    }
  }

  // ========== CRUD EXPERIENCIAS ==========
  async function crearExperiencia(e) {
    e.preventDefault();
    try {
      const cuerpo = {
        ...formExperiencia,
        bullets: formExperiencia.bullets
          .split("\n")
          .map((x) => x.trim())
          .filter(Boolean),
        etiquetas: formExperiencia.etiquetas
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        fechaFin: formExperiencia.actual ? null : formExperiencia.fechaFin,
      };
      await apiFetch("/api/experiencia", {
        metodo: "POST",
        cuerpo,
        token,
      });
      setFormExperiencia(estadoInicialExperiencia);
      await cargarExperiencias();
      toast.success("Experiencia creada");
    } catch (err) {
      toast.error(err.message || "Error al crear experiencia");
    }
  }

  async function seleccionarEditarExperiencia(exp) {
    setEditIdExperiencia(exp._id);
    setFormExperiencia({
      tipo: exp.tipo || "work",
      titulo: exp.titulo || "",
      empresa: exp.empresa || "",
      ubicacion: exp.ubicacion || "",
      fechaInicio: exp.fechaInicio ? exp.fechaInicio.split("T")[0] : "",
      fechaFin: exp.fechaFin ? exp.fechaFin.split("T")[0] : "",
      actual: !!exp.actual,
      bullets: (exp.bullets || []).join("\n"),
      etiquetas: (exp.etiquetas || []).join(", "),
      publicado: !!exp.publicado,
      orden: exp.orden || 0,
    });
    setTabActiva("experiencias");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function guardarEdicionExperiencia(e) {
    e.preventDefault();
    try {
      const cuerpo = {
        ...formExperiencia,
        bullets: formExperiencia.bullets
          .split("\n")
          .map((x) => x.trim())
          .filter(Boolean),
        etiquetas: formExperiencia.etiquetas
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        fechaFin: formExperiencia.actual ? null : formExperiencia.fechaFin,
      };
      await apiFetch(`/api/experiencia/${editIdExperiencia}`, {
        metodo: "PUT",
        cuerpo,
        token,
      });
      setEditIdExperiencia(null);
      setFormExperiencia(estadoInicialExperiencia);
      await cargarExperiencias();
      toast.success("Experiencia actualizada");
    } catch (err) {
      toast.error(err.message || "Error al actualizar experiencia");
    }
  }

  async function eliminarExperiencia(id) {
    if (!confirm("¿Eliminar esta experiencia?")) return;
    try {
      await apiFetch(`/api/experiencia/${id}`, {
        metodo: "DELETE",
        token,
      });
      await cargarExperiencias();
      toast.success("Experiencia eliminada");
    } catch (err) {
      toast.error(err.message || "Error al eliminar experiencia");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Panel de Administración
      </h1>

      {/* Pestañas */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setTabActiva("proyectos")}
          className={`px-4 py-2 font-medium ${
            tabActiva === "proyectos"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
        >
          Proyectos
        </button>
        <button
          onClick={() => setTabActiva("experiencias")}
          className={`px-4 py-2 font-medium ${
            tabActiva === "experiencias"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
        >
          Experiencias
        </button>
      </div>

      {/* Contenido de Proyectos */}
      {tabActiva === "proyectos" && (
        <>
          {/* Formulario Crear/Editar Proyecto */}
          <form
            onSubmit={editIdProyecto ? guardarEdicion : crearProyecto}
            className="bg-white rounded-lg shadow p-4 mb-6 space-y-3"
          >
            <h2 className="text-lg font-semibold">
              {editIdProyecto ? "Editar proyecto" : "Crear nuevo proyecto"}
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm">Título</span>
                <input
                  name="titulo"
                  value={formProyecto.titulo}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm">Publicado</span>
                <input
                  type="checkbox"
                  name="publicado"
                  checked={formProyecto.publicado}
                  onChange={onChange}
                  className="ml-2 align-middle"
                />
              </label>

              <label className="md:col-span-2 block">
                <span className="text-sm">Descripción</span>
                <textarea
                  name="descripcion"
                  value={formProyecto.descripcion}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  rows="3"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm">URL Repositorio</span>
                <input
                  name="urlRepositorio"
                  value={formProyecto.urlRepositorio}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="https://github.com/usuario/repo"
                />
              </label>

              <label className="block">
                <span className="text-sm">URL Demo</span>
                <input
                  name="urlDemo"
                  value={formProyecto.urlDemo}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="https://mi-demo.vercel.app"
                />
              </label>

              <label className="block">
                <span className="text-sm">Etiquetas (separadas por coma)</span>
                <input
                  name="etiquetas"
                  value={formProyecto.etiquetas}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="react, node, tailwind"
                />
              </label>

              <label className="md:col-span-2 block">
                <span className="text-sm">Imagen destacada</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onChangeImagen}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceptados: JPG, PNG, GIF, WebP (máx. 5MB)
                </p>
              </label>

              {/* Previsualización de imagen */}
              {(imagenProyecto.previsualizacion || formProyecto.imagenDestacada) && (
                <div className="md:col-span-2">
                  <span className="text-sm block mb-2">Previsualización:</span>
                  <div className="relative inline-block">
                    <img
                      src={imagenProyecto.previsualizacion || formProyecto.imagenDestacada}
                      alt="Preview"
                      className="max-w-xs max-h-48 rounded border"
                    />
                    <button
                      type="button"
                      onClick={eliminarImagenSeleccionada}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      title="Eliminar imagen"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                {editIdProyecto ? "Guardar cambios" : "Crear proyecto"}
              </button>
              {editIdProyecto && (
                <button
                  type="button"
                  onClick={() => {
                    setEditIdProyecto(null);
                    setFormProyecto(estadoInicialProyecto);
                  }}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {/* Listado de Proyectos */}
          <section className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Proyectos</h2>
              {cargandoProyectos && <span className="text-sm">Actualizando...</span>}
            </div>

            {errorProyectos && (
              <div className="p-2 bg-red-100 text-red-700 rounded mb-3">{errorProyectos}</div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-2">Título</th>
                    <th className="p-2">Publicado</th>
                    <th className="p-2">Etiquetas</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.map((p) => (
                    <tr key={p._id} className="border-b">
                      <td className="p-2">{p.titulo}</td>
                      <td className="p-2">{p.publicado ? "Sí" : "No"}</td>
                      <td className="p-2">{(p.etiquetas || []).join(", ")}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => seleccionarEditar(p)}
                            className="px-3 py-1 rounded bg-yellow-500 text-white"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarProyecto(p._id)}
                            className="px-3 py-1 rounded bg-red-600 text-white"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {proyectos.length === 0 && !cargandoProyectos && (
                    <tr>
                      <td className="p-2 text-gray-500" colSpan="4">
                        No hay proyectos todavía.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* Contenido de Experiencias */}
      {tabActiva === "experiencias" && (
        <>
          {/* Formulario Crear/Editar Experiencia */}
          <form
            onSubmit={editIdExperiencia ? guardarEdicionExperiencia : crearExperiencia}
            className="bg-white rounded-lg shadow p-4 mb-6 space-y-3"
          >
            <h2 className="text-lg font-semibold">
              {editIdExperiencia ? "Editar experiencia" : "Crear nueva experiencia"}
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm">Tipo</span>
                <select
                  name="tipo"
                  value={formExperiencia.tipo}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                >
                  <option value="work">Trabajo</option>
                  <option value="education">Educación</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm">Publicado</span>
                <input
                  type="checkbox"
                  name="publicado"
                  checked={formExperiencia.publicado}
                  onChange={onChange}
                  className="ml-2 align-middle"
                />
              </label>

              <label className="md:col-span-2 block">
                <span className="text-sm">Título / Cargo</span>
                <input
                  name="titulo"
                  value={formExperiencia.titulo}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Ej: Desarrollador Full-Stack Senior"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm">Empresa / Institución</span>
                <input
                  name="empresa"
                  value={formExperiencia.empresa}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Ej: Tech Solutions Inc."
                />
              </label>

              <label className="block">
                <span className="text-sm">Ubicación</span>
                <input
                  name="ubicacion"
                  value={formExperiencia.ubicacion}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="Ej: Madrid, España"
                />
              </label>

              <label className="block">
                <span className="text-sm">Fecha Inicio</span>
                <input
                  type="date"
                  name="fechaInicio"
                  value={formExperiencia.fechaInicio}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm">Fecha Fin</span>
                <input
                  type="date"
                  name="fechaFin"
                  value={formExperiencia.fechaFin}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  disabled={formExperiencia.actual}
                />
              </label>

              <label className="block md:col-span-2">
                <input
                  type="checkbox"
                  name="actual"
                  checked={formExperiencia.actual}
                  onChange={onChange}
                  className="align-middle"
                />
                <span className="text-sm ml-2">Trabajo/Estudio actual</span>
              </label>

              <label className="md:col-span-2 block">
                <span className="text-sm">Descripción (una línea por viñeta)</span>
                <textarea
                  name="bullets"
                  value={formExperiencia.bullets}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  rows="4"
                  placeholder="Desarrollo de aplicaciones web&#10;Trabajo en equipo Agile&#10;Implementación de APIs RESTful"
                />
              </label>

              <label className="block">
                <span className="text-sm">Etiquetas (separadas por coma)</span>
                <input
                  name="etiquetas"
                  value={formExperiencia.etiquetas}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                  placeholder="React, Node.js, MongoDB"
                />
              </label>

              <label className="block">
                <span className="text-sm">Orden (para ordenar manualmente)</span>
                <input
                  type="number"
                  name="orden"
                  value={formExperiencia.orden}
                  onChange={onChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                {editIdExperiencia ? "Guardar cambios" : "Crear experiencia"}
              </button>
              {editIdExperiencia && (
                <button
                  type="button"
                  onClick={() => {
                    setEditIdExperiencia(null);
                    setFormExperiencia(estadoInicialExperiencia);
                  }}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {/* Listado de Experiencias */}
          <section className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Experiencias</h2>
              {cargandoExperiencias && <span className="text-sm">Actualizando...</span>}
            </div>

            {errorExperiencias && (
              <div className="p-2 bg-red-100 text-red-700 rounded mb-3">{errorExperiencias}</div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-2">Tipo</th>
                    <th className="p-2">Título</th>
                    <th className="p-2">Empresa</th>
                    <th className="p-2">Publicado</th>
                    <th className="p-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {experiencias.map((exp) => (
                    <tr key={exp._id} className="border-b">
                      <td className="p-2">
                        {exp.tipo === "work" ? "Trabajo" : "Educación"}
                      </td>
                      <td className="p-2">{exp.titulo}</td>
                      <td className="p-2">{exp.empresa || "-"}</td>
                      <td className="p-2">{exp.publicado ? "Sí" : "No"}</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => seleccionarEditarExperiencia(exp)}
                            className="px-3 py-1 rounded bg-yellow-500 text-white"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarExperiencia(exp._id)}
                            className="px-3 py-1 rounded bg-red-600 text-white"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {experiencias.length === 0 && !cargandoExperiencias && (
                    <tr>
                      <td className="p-2 text-gray-500" colSpan="5">
                        No hay experiencias todavía.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
