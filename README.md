# Destino Abierto
# Grupo 541A
Estudiantes: Steven Gomez - Juan Pablo Godoy

Destino Abierto es una página para comparar dos países al mismo tiempo. La idea salió del briefing: cuando uno está escogiendo a dónde irse de intercambio o de viaje, termina con varias pestañas abiertas y copiando datos a mano en una hoja, y ahí es fácil equivocarse.

En la página se escogen dos países y se ven uno al lado del otro con los mismos datos y en el mismo orden: capital, región, población, idiomas, moneda, husos horarios, diferencia de hora con Colombia y algunos lugares para visitar. Las filas donde los dos países son distintos quedan marcadas. Cada país tiene también su propia página con todos sus datos.

Los datos de los países salen de la API de REST Countries (versión 5).

## Sitio publicado
- Inicio: https://frontend-programacion-iv-uniajc.github.io/frontend-programacion-iv-crear-repo-group-8/
- Catálogo: https://frontend-programacion-iv-uniajc.github.io/frontend-programacion-iv-crear-repo-group-8/catalogo
- Detalle de un país: https://frontend-programacion-iv-uniajc.github.io/frontend-programacion-iv-crear-repo-group-8/paises/COL
- Comparación: https://frontend-programacion-iv-uniajc.github.io/frontend-programacion-iv-crear-repo-group-8/detalle?a=COL&b=JPN

## Prototipo
https://www.figma.com/proto/TG2qGwY6posgIflN2yD2dM/Wireframe-Destino-Abierto?node-id=60-991&p=f&t=sitOc1v3kQJrLL1B-1&scaling=min-zoom&content-scaling=fixed&page-id=35%3A586&starting-point-node-id=60%3A991&show-proto-sidebar=1

## Alcance
Seguimos lo que quedó en el acta del briefing. En esta primera versión se puede buscar un país, escoger dos y compararlos.

Hay cosas que el briefing dejaba por fuera y que igual dejamos en la página porque nos pueden servir en las próximas clases:
- Favoritos: la página está, pero todavía no guarda nada.
- Filtros por idioma y moneda: se ven en el catálogo, pero por ahora no filtran.
- Paginación del catálogo: los botones se ven, pero todavía no cambian de página.

## De dónde sale cada dato
Todo lo que habla con la API está en `src/services/api.js`. Ahí la función `adaptarPais()` pasa cada país de la API a la forma que usan nuestras tarjetas, la misma de `src/data/datos-de-prueba.js`.

| Campo en la página | Campo de la API | Cómo se obtiene |
|---|---|---|
| Código (va en la dirección, ej. `/paises/COL`) | `codes.alpha_3` | Directo |
| Nombre | `names.translations.spa.common` | Directo, ya viene en español. Si no viene, se usa `names.common` |
| Bandera | `flag.url_svg` | Directo. Si no viene, se muestra una imagen de "Bandera no disponible" |
| Capital | `capitals[].name` | Directo. Si tiene varias se separan con coma. Si no tiene, la tarjeta dice "Sin capital" y el detalle y la comparación dicen "Dato no disponible" |
| Región | `region` | Traducido: Americas → América, Europe → Europa… |
| Subregión | `subregion` | Directo (viene en inglés) |
| Población | `population` | Directo, con puntos de miles y "aprox." porque la API da una estimación |
| Idiomas | `languages[].bcp47` | Traducido con `Intl.DisplayNames`: "es" → "español" |
| Moneda | `currencies[]` (`code`, `name`, `symbol`) | Traducido: "peso colombiano (COP, $)" |
| Husos horarios | `timezones` | Directo |
| Diferencia con Colombia | No viene en la API | Estimado. Está en `src/data/Paises_lugares_y_diferencia_horaria.json`: es el huso del país menos el de Colombia (UTC-5). Si el país tiene varios husos, se usa el de la capital. Dice "aprox." porque no tiene en cuenta el horario de verano |
| Lugares imperdibles | No viene en la API | Los escribimos nosotros en el mismo archivo JSON. Son sugerencias de lugares muy visitados |

Algunos datos llegan en inglés porque la API no los trae en español: las capitales (Paris, Tokyo, New Delhi) y las subregiones (Western Europe, South America). Los nombres de los países, las regiones, los idiomas y las monedas sí quedan en español.

## Si la API falla
Si la API no responde, la clave no está o la dirección está mal escrita, el build no se rompe: sale un aviso en la terminal y el sitio se arma con los 6 países de prueba de `src/data/datos-de-prueba.js`.

```
[api] No se pudo leer REST Countries (...). Uso los datos de prueba.
```

La clave de la API va en el archivo `.env`, que no se sube a GitHub.

## Cómo publicar
El sitio se construye en el computador y se sube la carpeta `dist/` a la rama `gh-pages`. Siempre desde `main` actualizado:

```
git switch main
git pull
npm install
npm run deploy
```

$env:CACHE_DIR = "$env:TEMP\ghp"; npm run deploy
```

En GitHub, Settings → Pages tiene como fuente la rama `gh-pages` y la carpeta `/ (root)`.

## Evidencia del taller (Datos reales desde la API)
- Pull request fusionado en `main`: (pendiente)
- Captura de Settings → Pages con la rama `gh-pages`: (pendiente)
- Capturas del catálogo y de un detalle a 320 px y en escritorio, al lado del mockup: (pendiente)
- Captura del build con la dirección de la API mal escrita: (pendiente)
Se encuentra en docs/img/
## Pregunta de la clase
¿En qué ancho pasa la portada de una a dos columnas, y qué línea del CSS lo decide?

A partir de los 900 px pasa de una sola columna a dos. La línea que lo decide es la 112 de `src/pages/index.astro`, que está dentro del `@media (min-width: 900px)` de la línea 110:

```css
grid-template-columns: 1.05fr 0.95fr;
```
