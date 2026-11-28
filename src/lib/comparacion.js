// comparacion.js
// Reglas de la tabla de comparacion. Las usan detalle.astro al construir
// el sitio Y el <script> del navegador, para que ambos muestren lo mismo.

/** Filas de la tabla, en el orden del briefing. Nunca cambia de orden. */
export const FILAS = [
  { campo: "capital", etiqueta: "Capital" },
  { campo: "region", etiqueta: "Región" },
  { campo: "poblacion", etiqueta: "Población" },
  { campo: "idiomas", etiqueta: "Idiomas" },
  { campo: "monedas", etiqueta: "Moneda" },
  { campo: "husos", etiqueta: "Husos horarios" },
  // Estas dos no vienen de la API (ver src/lib/extras.js).
  { campo: "diferenciaColombia", etiqueta: "Diferencia con Colombia" },
  // Los lugares siempre son distintos entre paises: no se marcan con ≠.
  { campo: "lugares", etiqueta: "Lugares imperdibles (sugeridos)", comparar: false },
];

export const SIN_DATO = "Dato no disponible";

// Textos que la API (o adaptarPais) usa cuando en realidad no hay dato.
// "Sin capital" es lo que escribe adaptarPais() en api.js cuando no hay capital.
const VACIOS = ["", "Sin capital", "Sin verificar", "Sin dato"];

/**
 * Devuelve SIEMPRE una lista de textos listos para mostrar.
 * Lista vacia = dato no disponible.
 */
export function valores(pais, campo) {
  const valor = pais?.[campo];
  if (campo === "poblacion") {
    // La API entrega una estimacion, no un censo: la interfaz lo dice.
    return typeof valor === "number" && valor > 0
      ? [`${valor.toLocaleString("es-CO")} hab. aprox.`]
      : [];
  }
  const lista = Array.isArray(valor) ? valor : [valor];
  return lista.filter(
    (v) => typeof v === "string" && !VACIOS.includes(v.trim())
  );
}

/** true si los dos paises tienen algo distinto en ese campo. */
export function sonDistintos(paisA, paisB, campo) {
  if (FILAS.find((f) => f.campo === campo)?.comparar === false) return false;
  const clave = (pais) => [...valores(pais, campo)].sort().join("|");
  return clave(paisA) !== clave(paisB);
}
