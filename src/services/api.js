// api.js
// Todo lo que habla con la API de REST Countries (v5) vive aqui.
// Se ejecuta al CONSTRUIR el sitio (npm run build / astro dev), nunca en el
// navegador: por eso la clave no llega al usuario.
 
import { paises as paisesDePrueba } from "../data/datos-de-prueba.js";
 
const URL_API = "https://api.restcountries.com/countries/v5";
// La clave sale del archivo .env (en tu computador) o del secreto de GitHub
// (al publicar). NUNCA se escribe aqui directamente.
const CLAVE = import.meta.env.RESTCOUNTRIES_KEY;
 
/**
 * Un pais con NUESTRA forma (la misma de datos-de-prueba.js).
 * @typedef {Object} Pais
 * @property {string} id          Codigo de 3 letras, ej. "COL"
 * @property {string} nombre      Nombre en espanol
 * @property {string} bandera     URL de la bandera (SVG)
 * @property {string} banderaAlt  Descripcion de la bandera (texto alternativo)
 * @property {string} capital
 * @property {string} region
 * @property {string} subregion
 * @property {number} poblacion
 * @property {string[]} idiomas
 * @property {string[]} monedas
 * @property {string[]} husos
 */
 
const REGIONES = {
  Africa: "África",
  Americas: "América",
  Antarctic: "Antártida",
  Asia: "Asia",
  Europe: "Europa",
  Oceania: "Oceanía",
};
 
// Intl.DisplayNames traduce codigos de idioma y moneda al espanol
// ("ja" -> "japones", "JPY" -> "yen") sin escribir una tabla a mano.
const nombreIdioma = new Intl.DisplayNames(["es"], { type: "language" });
const nombreMoneda = new Intl.DisplayNames(["es"], { type: "currency" });
 
function traducir(traductor, codigo, respaldo) {
  try {
    return traductor.of(codigo) ?? respaldo;
  } catch {
    return respaldo;
  }
}
 
/** Convierte un pais "crudo" de la API en un Pais con nuestra forma. */
export function adaptarPais(p) {
  return {
    id: p.codes.alpha_3,
    nombre: p.names.translations?.spa?.common ?? p.names.common,
    // "" si no viene: las paginas muestran entonces la imagen por defecto
    bandera: p.flag?.url_svg ?? "",
    banderaAlt: `Bandera de ${p.names.translations?.spa?.common ?? p.names.common}`,
    capital: p.capitals?.length
      ? p.capitals.map((c) => c.name).join(", ")
      : "Sin capital",
    region: REGIONES[p.region] ?? p.region,
    subregion: p.subregion ?? "",
    poblacion: p.population ?? 0,
    idiomas: (p.languages ?? []).map((l) => traducir(nombreIdioma, l.bcp47, l.name)),
    monedas: (p.currencies ?? []).map(
      (m) => `${traducir(nombreMoneda, m.code, m.name)} (${m.code}, ${m.symbol})`
    ),
    husos: p.timezones ?? [],
  };
}
 
/** Pide una pagina de resultados a la API. */
async function pedirPagina(offset) {
  const respuesta = await fetch(`${URL_API}?limit=100&offset=${offset}`, {
    headers: { Authorization: `Bearer ${CLAVE}` },
    signal: AbortSignal.timeout(10000),
  });
  if (!respuesta.ok) throw new Error(`la API respondio ${respuesta.status}`);
  const datos = await respuesta.json();
  if (!datos.data?.objects) throw new Error("la API no devolvio paises");
  return datos.data;
}
 
let cache = null; // para no pedir lo mismo en cada pagina del sitio
 
/** @returns {Promise<Pais[]>} Paises soberanos, ordenados por nombre. */
export async function obtenerPaises() {
  if (cache) return cache;
  if (!CLAVE) {
    console.warn("[api] Falta RESTCOUNTRIES_KEY en el archivo .env. Uso los datos de prueba.");
    return paisesDePrueba;
  }
  try {
    const crudos = [];
    // La API entrega maximo 100 paises por pedido: se piden paginas
    // hasta que "more" sea false (254 paises = 3 pedidos).
    for (let offset = 0; ; offset += 100) {
      const pagina = await pedirPagina(offset);
      crudos.push(...pagina.objects);
      if (!pagina.meta.more) break;
    }
    cache = crudos
      // solo paises soberanos y con codigo (quita territorios y casos como Abjasia)
      .filter((p) => p.classification?.sovereign && p.codes?.alpha_3)
      .map(adaptarPais)
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    return cache;
  } catch (error) {
    console.warn(`[api] No se pudo leer REST Countries (${error.message}). Uso los datos de prueba.`);
    return paisesDePrueba;
  }
}
 
/** Busca un pais por su codigo de 3 letras ("COL"). */
export async function obtenerPais(id) {
  const paises = await obtenerPaises();
  return paises.find((p) => p.id === id);
}
 
