// datos-de-prueba.js
// Seis paises escritos a mano con la MISMA forma que devuelve adaptarPais()
// en src/services/api.js. Se usan mientras no hay clave o si la API falla.
// Valores copiados de la API REST Countries v5 (noviembre de 2026).
 
export const paises = [
  {
    id: "FRA",
    nombre: "Francia",
    bandera: "https://flags.restcountries.com/v5/svg/fr.svg",
    banderaAlt: "Bandera de Francia",
    capital: "Paris",
    region: "Europa",
    subregion: "Western Europe",
    poblacion: 69081996,
    idiomas: [
      "francés"
    ],
    monedas: [
      "euro (EUR, €)"
    ],
    husos: [
      "UTC-10:00",
      "UTC-09:30",
      "UTC-09:00",
      "UTC-08:00",
      "UTC-04:00",
      "UTC-03:00",
      "UTC+01:00",
      "UTC+02:00",
      "UTC+03:00",
      "UTC+04:00",
      "UTC+05:00",
      "UTC+10:00",
      "UTC+11:00",
      "UTC+12:00"
    ]
  },
  {
    id: "JPN",
    nombre: "Japón",
    bandera: "https://flags.restcountries.com/v5/svg/jp.svg",
    banderaAlt: "Bandera de Japón",
    capital: "Tokyo",
    region: "Asia",
    subregion: "Eastern Asia",
    poblacion: 122430000,
    idiomas: [
      "japonés"
    ],
    monedas: [
      "yen japonés (JPY, ¥)"
    ],
    husos: [
      "UTC+09:00"
    ]
  },
  {
    id: "COL",
    nombre: "Colombia",
    bandera: "https://flags.restcountries.com/v5/svg/co.svg",
    banderaAlt: "Bandera de Colombia",
    capital: "Bogotá",
    region: "América",
    subregion: "South America",
    poblacion: 53399171,
    idiomas: [
      "español"
    ],
    monedas: [
      "peso colombiano (COP, $)"
    ],
    husos: [
      "UTC-05:00"
    ]
  },
  {
    id: "ITA",
    nombre: "Italia",
    bandera: "https://flags.restcountries.com/v5/svg/it.svg",
    banderaAlt: "Bandera de Italia",
    capital: "Rome",
    region: "Europa",
    subregion: "Southern Europe",
    poblacion: 58949500,
    idiomas: [
      "italiano",
      "catalán"
    ],
    monedas: [
      "euro (EUR, €)"
    ],
    husos: [
      "UTC+01:00"
    ]
  },
  {
    id: "AUS",
    nombre: "Australia",
    bandera: "https://flags.restcountries.com/v5/svg/au.svg",
    banderaAlt: "Bandera de Australia",
    capital: "Canberra",
    region: "Oceanía",
    subregion: "Australia and New Zealand",
    poblacion: 27921150,
    idiomas: [
      "inglés"
    ],
    monedas: [
      "dólar australiano (AUD, $)"
    ],
    husos: [
      "UTC+05:00",
      "UTC+06:30",
      "UTC+07:00",
      "UTC+08:00",
      "UTC+09:30",
      "UTC+10:00",
      "UTC+10:30",
      "UTC+11:30"
    ]
  },
  {
    id: "MAR",
    nombre: "Marruecos",
    bandera: "https://flags.restcountries.com/v5/svg/ma.svg",
    banderaAlt: "Bandera de Marruecos",
    capital: "Rabat",
    region: "África",
    subregion: "Northern Africa",
    poblacion: 37254695,
    idiomas: [
      "árabe",
      "tamazight estándar marroquí"
    ],
    monedas: [
      "dírham marroquí (MAD, د.م.)"
    ],
    husos: [
      "UTC"
    ]
  },
];
 
// Lista para el filtro, calculada a partir de los datos.
// new Set() quita los repetidos ("Europa" aparece dos veces y queda una).
export const regiones = [...new Set(paises.map((p) => p.region))];
