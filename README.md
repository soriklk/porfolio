# Portfolio de Iván Soria Álvarez

Portfolio personal desarrollado con React y Vite. Presenta experiencia en
desarrollo de software e IA generativa, con una escena 3D interactiva y un
recorrido de áreas de trabajo vinculado al scroll en escritorio.

## Desarrollo

```sh
npm install
npm run dev
```

`npm run lint` comprueba el código y `npm run build` genera la versión de
producción.

## Animación y 3D

Investigación consultada el 15 de noviembre de 2026. Las cifras son descargas
de paquetes npm durante los 30 días del 16 de octubre al 14 de noviembre de
2026; no representan usuarios únicos y pueden incluir instalaciones
automatizadas.

| Herramienta | Descargas npm / 30 días | Uso en este portfolio |
| --- | ---: | --- |
| [Three.js](https://threejs.org/docs/) ([datos](https://api.npmjs.org/downloads/point/last-month/three)) | 131,315,013 | Escena 3D ligera, geometrías, iluminación y respuesta al puntero |
| [GSAP + ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) ([datos](https://api.npmjs.org/downloads/point/last-month/gsap)) | 31,873,912 | Recorrido horizontal fijado al scroll, revelados y progreso |
| [Motion para React](https://motion.dev/docs/react) ([datos](https://api.npmjs.org/downloads/point/last-month/motion)) | 133,412,296 (`motion`) | Alternativa declarativa para animaciones de interfaz y gestos; no se añade porque GSAP ya cubre las animaciones de este diseño |
| [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) ([datos](https://api.npmjs.org/downloads/point/last-month/%40react-three%2Ffiber)) | 35,380,144 | Alternativa declarativa de Three.js para escenas React complejas; la escena de esta página es pequeña y usa Three.js directamente |
| [Lenis](https://github.com/darkroomengineering/lenis) ([datos](https://api.npmjs.org/downloads/point/last-month/lenis)) | 9,970,991 | Suavizado opcional del scroll; se conserva el desplazamiento nativo para no interferir con el gesto táctil ni el scroll de accesibilidad |

No existe una única clasificación de popularidad que mida uso real: aquí se
combinan las descargas aproximadas de npm con las capacidades, el ajuste al
proyecto y el coste de cada dependencia.

El proyecto ya incluía GSAP y Three.js, así que se reutilizan sin sumar
dependencias. Three.js va en un módulo aparte para que el paquete principal
de la página no cargue el motor 3D. En escritorio, ScrollTrigger fija temporalmente la
sección de recorrido y sincroniza sus paneles con el scroll; en móvil, esos
paneles se convierten en una fila deslizable. La escena respeta la preferencia
de movimiento reducido, pausa su renderizado cuando queda fuera de pantalla y
dispone de una alternativa visual si WebGL no está disponible.
