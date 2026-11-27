// extras.js
// Datos que NO vienen de la API: diferencia horaria con Colombia y lugares
// imperdibles sugeridos. Salen de src/data/Paises_lugares_y_diferencia_horaria.json,
// un archivo que preparamos nosotros.
// Se usa solo al construir el sitio: el JSON completo no llega al navegador.

import extras from "../data/Paises_lugares_y_diferencia_horaria.json";

const porCodigo = new Map(extras.paises.map((e) => [e.codigo, e]));

/**
 * Devuelve el pais con dos campos mas:
 * - diferenciaColombia: texto, ej. "10 h 30 min más que Colombia (aprox.)"
 * - lugares: lista de lugares imperdibles sugeridos
 * Si el pais no esta en el JSON, ambos quedan vacios ("Dato no disponible").
 */
export function conExtras(pais) {
  const extra = porCodigo.get(pais.id);
  return {
    ...pais,
    // "aprox." porque no se tiene en cuenta el horario de verano
    diferenciaColombia: extra?.lectura ? `${extra.lectura} (aprox.)` : "",
    lugares: extra?.lugaresImperdibles ?? [],
  };
}
