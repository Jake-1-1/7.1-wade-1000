=====================================================================
  EL COMAL - PROYECTO FINAL DE DESARROLLO WEB
=====================================================================

Repositorio en GitHub:
https://github.com/TU_USUARIO/TU_REPOSITORIO


DESCRIPCIÓN
-----------
El Comal es el sitio web de un restaurante ficticio de comida
mexicana. Tiene una página de inicio con un carrusel de imágenes y
11 páginas subordinadas: el menú (completo y por categorías),
promociones, reservas, galería, nosotros, ubicación y contacto.

El sitio usa HTML5 semántico, CSS con Bootstrap 5 personalizado y
JavaScript para las interacciones. Su estilo es divertido y
llamativo, en negro, blanco y rojo. Es responsivo: se adapta a
celulares, tabletas y computadoras.


ESTRUCTURA DE ARCHIVOS
----------------------
index.html            Página de inicio: carrusel, platos destacados,
                      cifras animadas y accesos a todas las páginas.
                      Al inicio tiene un comentario con las
                      características principales de HTML5.

paginas/              11 páginas subordinadas
  menu.html             Menú completo con filtros y buscador
  entradas.html         Entradas y tabla de salsas
  platos-fuertes.html   Tacos, burritos, enchiladas y más
  postres.html          Postres
  bebidas.html          Aguas frescas y tabla de tamaños
  promociones.html      Promociones con cuenta regresiva
  reservas.html         Formulario de reserva con validación
  galeria.html          Fotos con visor ampliado
  nosotros.html         Historia, misión, visión y equipo
  ubicacion.html        Mapa, dirección y horario
  contacto.html         Formulario de contacto con validación

css/estilos.css       Estilos propios que personalizan Bootstrap
js/main.js            Código compartido: datos de los platos,
                      tarjetas, ventana de detalles, filtros del menú,
                      "abierto/cerrado", cifras y botón "volver arriba"
js/carrusel.js        Carrusel de imágenes de la página de inicio
js/validacion.js      Función reutilizable para validar formularios
js/reservas.js        Reglas del formulario de reservas
js/contacto.js        Reglas del formulario de contacto
js/galeria.js         Visor de imágenes de la galería
js/promociones.js     Cuenta regresiva de la promoción
img/                  Logo, mapa e ilustración en formato SVG
img/fotos/            14 fotos de los platos en formato WebP (livianas)


CÓMO CUMPLE CADA REQUISITO
--------------------------
1. Estructura HTML
   - Encabezado (<header> con <nav>), cuerpo (<main>) y pie
     (<footer>) en todas las páginas.
   - Elementos semánticos: header, nav, main, section, article,
     aside, figure, figcaption, footer y address.
   - Página de inicio + 11 páginas subordinadas.

2. Diseño CSS
   - Bootstrap 5: cuadrícula (container, row, col), navbar con
     menú desplegable, modal, tablas, alertas, formularios e interruptor.
   - Identidad propia: colores negro, blanco y rojo; fuentes Lilita One
     y Rubik; bordes gruesos y sombras tipo cómic. Todo definido con
     variables CSS en estilos.css.
   - Diseño responsivo: el menú se colapsa en celulares, las columnas
     se reorganizan y hay ajustes con @media para tabletas y celulares.

3. Interacción con JavaScript
   - Carrusel de imágenes en la página de inicio: avanza solo, tiene
     botones, puntos indicadores, teclado y deslizar con el dedo.
   - Platos: se resaltan al pasar el mouse y muestran sus detalles
     (ingredientes, picante, precio) en una ventana al hacer clic.
   - Formularios de reservas y contacto validados en tiempo real, con
     mensajes en cada campo. La reserva valida que la fecha no sea
     pasada, que el local abra ese día y que la hora sea antes del cierre.
   - Extras: filtros del menú, galería con visor, cuenta regresiva,
     indicador de "Abierto ahora / Cerrado" y cifras animadas.

4. Buenas prácticas
   - Archivos separados por tipo: HTML, CSS, JS e imágenes, cada uno
     en su carpeta.
   - Nombres claros y en español para clases, variables y funciones.
   - Código comentado, con un índice al inicio de cada archivo.
   - Código reutilizable: una sola función de validación para los dos
     formularios y los datos de los platos en un solo arreglo.
   - HTML semántico y accesible: textos alternativos (alt), <label> en
     los formularios, atributos aria, navegación con teclado y enlace
     para saltar al contenido.
   - Variables CSS para no repetir colores ni medidas.
   - Sin JavaScript dentro del HTML (sin onclick): los eventos se
     agregan con addEventListener.
   - "use strict", const y let.
   - Los textos que escribe el usuario se insertan con textContent
     (seguridad).
   - Fotos comprimidas en WebP (unos 80 KB cada una), ilustraciones SVG
     y Bootstrap desde CDN para que el proyecto pese poco.
   - Cada foto se llama igual que el "id" de su plato, así JavaScript
     la encuentra sin tener que escribir la ruta a mano.
   - Respeto por la preferencia del sistema de "reducir movimiento".


CÓMO VER EL PROYECTO
--------------------
1. Descomprimir la carpeta.
2. Abrir index.html en el navegador (Chrome, Edge o Firefox).
3. Se necesita conexión a internet para cargar Bootstrap, los
   íconos y las fuentes.

CRÉDITOS DE LAS FOTOS
---------------------
Las fotos de los platos son de Unsplash (https://unsplash.com) y se
usan bajo la Licencia de Unsplash, que permite usarlas gratis, también
en proyectos, sin pedir permiso. Se redujeron de tamaño y se
convirtieron a WebP para que pesen poco.

Nota: El Comal es un restaurante ficticio con fines educativos.
Los platos, precios, personas y direcciones no son reales.
