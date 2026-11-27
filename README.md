# Destino Abierto
# Grupo 541A
Estudiantes: Steven Gomez - Juan Pablo Godoy

Destino Abierto es una página para comparar dos países al mismo tiempo. La idea salió del briefing: cuando uno está escogiendo a dónde irse de intercambio o de viaje, termina con varias pestañas abiertas y copiando datos a mano en una hoja, y ahí es fácil equivocarse.

En la página se escogen dos países y se ven uno al lado del otro con los mismos datos y en el mismo orden: capital, región, población, idiomas, moneda y husos horarios. Las filas donde los dos países son distintos quedan marcadas.

Los datos de los países salen de la API de REST Countries (versión 5).

## Prototipo
https://www.figma.com/proto/TG2qGwY6posgIflN2yD2dM/Wireframe-Destino-Abierto?node-id=60-991&p=f&t=sitOc1v3kQJrLL1B-1&scaling=min-zoom&content-scaling=fixed&page-id=35%3A586&starting-point-node-id=60%3A991&show-proto-sidebar=1

## Alcance
Seguimos lo que quedó en el acta del briefing. En esta primera versión se puede buscar un país, escoger dos y compararlos.

Hay cosas que el briefing dejaba por fuera y que igual dejamos en la página porque nos pueden servir en las próximas clases:
- Favoritos: la página está, pero todavía no guarda nada.
- Filtros por idioma y moneda: se ven en el catálogo, pero por ahora no filtran.
- Paginación del catálogo: los botones se ven, pero todavía no cambian de página.

## Pregunta de la clase
¿En qué ancho pasa la portada de una a dos columnas, y qué línea del CSS lo decide?

A partir de los 900 px pasa de una sola columna a dos. La línea que lo decide es la 112 de `src/pages/index.astro`, que está dentro del `@media (min-width: 900px)` de la línea 110:

```css
grid-template-columns: 1.05fr 0.95fr;
```
