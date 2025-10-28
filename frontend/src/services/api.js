import { API_URL } from "../config";

/**
 * Envuelve fetch para agregar headers comunes y manejar JSON.
 * Si hay token en localStorage, lo agrega como Bearer.
 */
export async function apiFetch(ruta, { metodo = "GET", cuerpo = null, token = null } = {}) {
  const headers = { "Content-Type": "application/json" };
  const authToken = token || localStorage.getItem("token");
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  const resp = await fetch(`${API_URL}${ruta}`, {
    method: metodo,
    headers,
    body: cuerpo ? JSON.stringify(cuerpo) : null,
  });

  // Intenta parsear JSON; si no, devuelve texto
  const contentType = resp.headers.get("content-type") || "";
  const esJSON = contentType.includes("application/json");
  const data = esJSON ? await resp.json() : await resp.text();

  if (!resp.ok) {
    const mensaje = esJSON && data?.mensaje ? data.mensaje : resp.statusText;
    throw new Error(mensaje || "Error en la petición");
  }

  return data;
}
