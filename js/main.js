/* =====================================================================
   EL COMAL - main.js
   ---------------------------------------------------------------------
   Código compartido por TODAS las páginas del sitio.

   1. Datos: platos del menú y horario del restaurante
   2. Tarjetas de platos:
        - se resaltan al pasar el mouse (o al enfocarlas con Tab)
        - muestran sus detalles en una ventana al hacer clic
   3. Filtros del menú (categoría, vegetariano y buscador)
   4. Estado del local: "Abierto ahora" o "Cerrado"
   5. Cifras animadas
   6. Detalles de la interfaz: sombra del menú, botón "volver arriba"
      y año del pie de página
   ===================================================================== */

"use strict";


/* ---------------------------------------------------------------------
   1. DATOS
   --------------------------------------------------------------------- */

// Las páginas dentro de /paginas/ usan rutas distintas a index.html
const enSubcarpeta = window.location.pathname.includes("/paginas/");
const rutaPaginas = enSubcarpeta ? "" : "paginas/";
const rutaFotos = enSubcarpeta ? "../img/fotos/" : "img/fotos/";

const categorias = {
    entradas: "Entradas",
    fuertes: "Platos fuertes",
    postres: "Postres",
    bebidas: "Bebidas"
};

// Cada plato es un objeto. "picante" va de 0 a 3.
// La foto de cada plato está en img/fotos/ y se llama igual que su "id".
const platos = [
    {
        id: "guacamole", categoria: "entradas", nombre: "Guacamole de la Casa", precio: 14900,
        descripcion: "Aguacate machacado al momento, con totopos crujientes.",
        detalle: "Lo preparamos en el molcajete frente a ti con aguacate, tomate, cebolla morada, cilantro y limón.",
        ingredientes: ["Aguacate", "Tomate", "Cebolla morada", "Cilantro", "Limón", "Totopos"],
        picante: 1, vegetariano: true, destacado: true
    },
    {
        id: "nachos", categoria: "entradas", nombre: "Nachos Locos", precio: 18900,
        descripcion: "Montaña de totopos con queso fundido, frijoles y jalapeños.",
        detalle: "Para compartir: totopos bañados en queso cheddar fundido, frijoles refritos, pico de gallo, crema y jalapeños.",
        ingredientes: ["Totopos", "Queso cheddar", "Frijoles", "Pico de gallo", "Crema", "Jalapeños"],
        picante: 2, vegetariano: true, destacado: true
    },
    {
        id: "elote", categoria: "entradas", nombre: "Elote Preparado", precio: 9900,
        descripcion: "Mazorca asada con mayonesa, queso y chile en polvo.",
        detalle: "El clásico de la calle mexicana: mazorca a la parrilla untada con mayonesa, queso cotija, limón y chile.",
        ingredientes: ["Mazorca", "Mayonesa", "Queso cotija", "Limón", "Chile en polvo"],
        picante: 1, vegetariano: true, destacado: false
    },
    {
        id: "tacos-pastor", categoria: "fuertes", nombre: "Tacos al Pastor", precio: 22900,
        descripcion: "Tres tacos de cerdo marinado con piña, cebolla y cilantro.",
        detalle: "Nuestra especialidad: cerdo marinado en achiote y chiles, asado en trompo y servido con piña asada.",
        ingredientes: ["Tortilla de maíz", "Cerdo al pastor", "Piña", "Cebolla", "Cilantro", "Salsa verde"],
        picante: 2, vegetariano: false, destacado: true
    },
    {
        id: "burrito", categoria: "fuertes", nombre: "Burrito Loco", precio: 26900,
        descripcion: "Tortilla gigante rellena de carne, arroz, frijoles y queso.",
        detalle: "Un burrito para los que llegan con hambre: carne de res desmechada, arroz rojo, frijoles, queso y guacamole.",
        ingredientes: ["Tortilla de harina", "Carne de res", "Arroz rojo", "Frijoles", "Queso", "Guacamole"],
        picante: 1, vegetariano: false, destacado: true
    },
    {
        id: "enchiladas", categoria: "fuertes", nombre: "Enchiladas Rojas", precio: 24900,
        descripcion: "Tortillas rellenas de pollo bañadas en salsa roja picante.",
        detalle: "Tres tortillas rellenas de pollo, bañadas en salsa de chile guajillo y gratinadas con queso.",
        ingredientes: ["Tortilla de maíz", "Pollo", "Salsa de guajillo", "Queso", "Crema", "Cebolla"],
        picante: 3, vegetariano: false, destacado: false
    },
    {
        id: "fajitas", categoria: "fuertes", nombre: "Fajitas de Res", precio: 32900,
        descripcion: "Tiras de res con pimentones, servidas en sartén caliente.",
        detalle: "Llegan chisporroteando a la mesa, con tortillas calientes para que armes tus propios tacos.",
        ingredientes: ["Res", "Pimentón rojo y verde", "Cebolla", "Tortillas", "Guacamole", "Crema"],
        picante: 1, vegetariano: false, destacado: false
    },
    {
        id: "quesadilla-veggie", categoria: "fuertes", nombre: "Quesadilla Veggie", precio: 19900,
        descripcion: "Tortilla dorada con queso, champiñones y vegetales asados.",
        detalle: "Tortilla de harina rellena de queso fundido, champiñones, pimentón y maíz, acompañada de pico de gallo.",
        ingredientes: ["Tortilla de harina", "Queso", "Champiñones", "Pimentón", "Maíz", "Pico de gallo"],
        picante: 0, vegetariano: true, destacado: false
    },
    {
        id: "churros", categoria: "postres", nombre: "Churros con Chocolate", precio: 11900,
        descripcion: "Churros crujientes con azúcar y canela, para mojar en chocolate.",
        detalle: "Recién hechos, espolvoreados con azúcar y canela, con una taza de chocolate caliente espeso.",
        ingredientes: ["Masa de churro", "Azúcar", "Canela", "Chocolate"],
        picante: 0, vegetariano: true, destacado: true
    },
    {
        id: "flan", categoria: "postres", nombre: "Flan Napolitano", precio: 9900,
        descripcion: "Flan cremoso con caramelo, receta de la abuela.",
        detalle: "Un flan suave y cremoso hecho con leche condensada y cubierto de caramelo dorado.",
        ingredientes: ["Leche", "Huevo", "Leche condensada", "Vainilla", "Caramelo"],
        picante: 0, vegetariano: true, destacado: false
    },
    {
        id: "helado-cajeta", categoria: "postres", nombre: "Helado de Cajeta", precio: 10900,
        descripcion: "Helado artesanal con dulce de leche de cabra.",
        detalle: "Dos bolas de helado artesanal de vainilla con cajeta caliente y nueces tostadas.",
        ingredientes: ["Helado de vainilla", "Cajeta", "Nueces"],
        picante: 0, vegetariano: true, destacado: false
    },
    {
        id: "jamaica", categoria: "bebidas", nombre: "Agua de Jamaica", precio: 6900,
        descripcion: "Refrescante agua de flor de jamaica con un toque de limón.",
        detalle: "Infusión fría de flor de jamaica, endulzada con panela y servida con hielo y limón.",
        ingredientes: ["Flor de jamaica", "Panela", "Limón", "Hielo"],
        picante: 0, vegetariano: true, destacado: true
    },
    {
        id: "horchata", categoria: "bebidas", nombre: "Horchata", precio: 6900,
        descripcion: "Bebida cremosa de arroz con canela.",
        detalle: "Bebida tradicional de arroz remojado, leche, vainilla y canela, servida bien fría.",
        ingredientes: ["Arroz", "Leche", "Canela", "Vainilla"],
        picante: 0, vegetariano: true, destacado: false
    },
    {
        id: "limonada-mango", categoria: "bebidas", nombre: "Limonada de Mango y Chile", precio: 8900,
        descripcion: "Limonada frappé con mango y escarchado de chile.",
        detalle: "Limonada granizada con pulpa de mango, servida en vaso escarchado con chile y sal.",
        ingredientes: ["Limón", "Mango", "Hielo", "Chile en polvo", "Sal"],
        picante: 1, vegetariano: true, destacado: false
    }
];

// Horario: 0 = domingo, 1 = lunes ... 6 = sábado. null = cerrado.
const horario = {
    0: { abre: 12, cierra: 20 },
    1: null,
    2: { abre: 12, cierra: 22 },
    3: { abre: 12, cierra: 22 },
    4: { abre: 12, cierra: 22 },
    5: { abre: 12, cierra: 23 },
    6: { abre: 12, cierra: 23 }
};

const nombresDias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

// Formatea un número como precio: 14900 → "$14.900"
function precio(valor) {
    return "$" + valor.toLocaleString("es-CO");
}

// Convierte 22 → "10:00 p. m."
function horaTexto(hora) {
    const sufijo = hora >= 12 ? "p. m." : "a. m.";
    const hora12 = hora % 12 === 0 ? 12 : hora % 12;
    return `${hora12}:00 ${sufijo}`;
}


/* ---------------------------------------------------------------------
   2. TARJETAS DE PLATOS
   --------------------------------------------------------------------- */

// Devuelve los chiles según el nivel de picante
function nivelPicante(nivel) {
    if (nivel === 0) {
        return "Sin picante";
    }
    return "🌶️".repeat(nivel);
}

// Crea el HTML de una tarjeta a partir de un objeto plato
function crearTarjetaPlato(plato) {
    const columna = document.createElement("div");
    columna.className = "col-sm-6 col-lg-4";
    columna.dataset.categoria = plato.categoria;
    columna.dataset.vegetariano = plato.vegetariano;

    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-plato h-100";
    tarjeta.tabIndex = 0; // permite llegar con la tecla Tab
    tarjeta.setAttribute("role", "button");
    tarjeta.setAttribute("aria-label", `Ver detalles de ${plato.nombre}`);

    // Los datos vienen de nuestro propio arreglo, por eso es seguro usar innerHTML
    tarjeta.innerHTML = `
        <div class="plato-foto">
            <img src="${rutaFotos}${plato.id}.webp" alt="${plato.nombre}" width="800" height="600" loading="lazy">
            <span class="sticker rojo plato-precio">${precio(plato.precio)}</span>
        </div>
        <span class="plato-categoria">${categorias[plato.categoria]}</span>
        <h3>${plato.nombre}</h3>
        <p>${plato.descripcion}</p>
        <div class="plato-pie">
            <span class="picante" title="Nivel de picante">${nivelPicante(plato.picante)}</span>
            <span class="plato-ver">Ver detalles <i class="bi bi-arrow-right" aria-hidden="true"></i></span>
        </div>`;

    // Resaltar al pasar el mouse
    tarjeta.addEventListener("mouseenter", () => tarjeta.classList.add("destacado"));
    tarjeta.addEventListener("mouseleave", () => tarjeta.classList.remove("destacado"));

    // Resaltar también al llegar con el teclado (accesibilidad)
    tarjeta.addEventListener("focus", () => tarjeta.classList.add("destacado"));
    tarjeta.addEventListener("blur", () => tarjeta.classList.remove("destacado"));

    // Mostrar detalles al hacer clic o con Enter / Espacio
    tarjeta.addEventListener("click", () => mostrarDetalles(plato));
    tarjeta.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            mostrarDetalles(plato);
        }
    });

    columna.appendChild(tarjeta);
    return columna;
}

// Llena cada contenedor que tenga el atributo data-platos
function renderizarPlatos() {
    document.querySelectorAll("[data-platos]").forEach((contenedor) => {
        const filtro = contenedor.dataset.platos;
        let lista;

        if (filtro === "todos") {
            lista = platos;
        } else if (filtro === "destacados") {
            lista = platos.filter((plato) => plato.destacado);
        } else {
            lista = platos.filter((plato) => plato.categoria === filtro);
        }

        for (const plato of lista) {
            contenedor.appendChild(crearTarjetaPlato(plato));
        }
    });
}

// Crea la ventana de detalles (modal de Bootstrap) una sola vez
function obtenerModal() {
    let modal = document.getElementById("modalPlato");

    if (!modal) {
        modal = document.createElement("div");
        modal.className = "modal fade";
        modal.id = "modalPlato";
        modal.tabIndex = -1;
        modal.setAttribute("aria-labelledby", "modalPlatoTitulo");
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <img class="modal-plato-foto" id="modalPlatoFoto" src="" alt="" width="800" height="600">
                    <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3 boton-cerrar-foto" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    <div class="modal-plato-cabecera">
                        <h2 id="modalPlatoTitulo"></h2>
                        <span class="sticker mt-3" id="modalPlatoPrecio"></span>
                    </div>
                    <div class="modal-body p-4">
                        <p id="modalPlatoDetalle"></p>
                        <div class="d-flex flex-wrap gap-3 mb-3">
                            <span><strong>Picante:</strong> <span id="modalPlatoPicante"></span></span>
                            <span class="etiqueta-veg d-none" id="modalPlatoVeg">🌱 Vegetariano</span>
                        </div>
                        <h3 class="h5">Ingredientes</h3>
                        <ul class="lista-check" id="modalPlatoIngredientes"></ul>
                    </div>
                    <div class="modal-footer border-0 px-4 pb-4 pt-0">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cerrar</button>
                        <a class="btn btn-primary" href="${rutaPaginas}reservas.html">Reservar mesa</a>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(modal);
    }

    return modal;
}

// Llena la ventana con los datos del plato y la muestra
function mostrarDetalles(plato) {
    const modal = obtenerModal();

    const foto = document.getElementById("modalPlatoFoto");
    foto.src = `${rutaFotos}${plato.id}.webp`;
    foto.alt = plato.nombre;
    document.getElementById("modalPlatoTitulo").textContent = plato.nombre;
    document.getElementById("modalPlatoPrecio").textContent = precio(plato.precio);
    document.getElementById("modalPlatoDetalle").textContent = plato.detalle;
    document.getElementById("modalPlatoPicante").textContent = nivelPicante(plato.picante);
    document.getElementById("modalPlatoVeg").classList.toggle("d-none", !plato.vegetariano);

    // Lista de ingredientes con un bucle
    const lista = document.getElementById("modalPlatoIngredientes");
    lista.innerHTML = "";
    for (const ingrediente of plato.ingredientes) {
        const item = document.createElement("li");
        item.innerHTML = '<i class="bi bi-check-circle-fill" aria-hidden="true"></i>';
        item.append(ingrediente);
        lista.appendChild(item);
    }

    bootstrap.Modal.getOrCreateInstance(modal).show();
}


/* ---------------------------------------------------------------------
   3. FILTROS DEL MENÚ (solo en menu.html)
   --------------------------------------------------------------------- */

// Quita mayúsculas y tildes para comparar textos ("Jamaica" = "jamaica")
function normalizar(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function activarFiltrosMenu() {
    const filtros = document.getElementById("filtrosMenu");
    if (!filtros) {
        return;
    }

    const botones = filtros.querySelectorAll("[data-filtro]");
    const buscador = document.getElementById("buscarPlato");
    const soloVeg = document.getElementById("soloVegetariano");
    const contador = document.getElementById("contadorPlatos");
    const sinResultados = document.getElementById("sinPlatos");
    const columnas = document.querySelectorAll("[data-platos='todos'] > div");

    let categoriaActual = "todos";

    function aplicarFiltros() {
        const texto = normalizar(buscador.value.trim());
        let visibles = 0;

        columnas.forEach((columna) => {
            const coincideCategoria = categoriaActual === "todos" || columna.dataset.categoria === categoriaActual;
            const coincideVeg = !soloVeg.checked || columna.dataset.vegetariano === "true";
            const coincideTexto = normalizar(columna.textContent).includes(texto);
            const mostrar = coincideCategoria && coincideVeg && coincideTexto;

            columna.classList.toggle("d-none", !mostrar);
            if (mostrar) {
                visibles++;
            }
        });

        contador.textContent = `Mostrando ${visibles} de ${columnas.length} platos`;
        sinResultados.classList.toggle("d-none", visibles > 0);
    }

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            categoriaActual = boton.dataset.filtro;
            botones.forEach((b) => {
                b.classList.toggle("activo", b === boton);
                b.setAttribute("aria-pressed", String(b === boton));
            });
            aplicarFiltros();
        });
    });

    buscador.addEventListener("input", aplicarFiltros);
    soloVeg.addEventListener("change", aplicarFiltros);
    aplicarFiltros();
}


/* ---------------------------------------------------------------------
   4. ESTADO DEL LOCAL: ¿abierto o cerrado?
   --------------------------------------------------------------------- */
function estaAbierto(fecha) {
    const horas = horario[fecha.getDay()];
    if (horas === null) {
        return false;
    }
    const hora = fecha.getHours();
    return hora >= horas.abre && hora < horas.cierra;
}

function mostrarEstadoLocal() {
    const ahora = new Date();
    const abierto = estaAbierto(ahora);
    const hoy = horario[ahora.getDay()];
    let texto;

    if (abierto) {
        texto = `Abierto ahora · cierra a las ${horaTexto(hoy.cierra)}`;
    } else if (hoy !== null && ahora.getHours() < hoy.abre) {
        texto = `Cerrado · hoy abrimos a las ${horaTexto(hoy.abre)}`;
    } else {
        texto = "Cerrado en este momento";
    }

    document.querySelectorAll(".estado-local").forEach((elemento) => {
        elemento.textContent = texto;
        elemento.classList.toggle("abierto", abierto);
        elemento.classList.toggle("cerrado", !abierto);
    });

    // En la tabla de horario se resalta el día de hoy
    const filaHoy = document.querySelector(`.tabla-horario tr[data-dia="${ahora.getDay()}"]`);
    if (filaHoy) {
        filaHoy.classList.add("hoy");
    }
}


/* ---------------------------------------------------------------------
   5. CIFRAS ANIMADAS
   Cuentan desde 0 hasta data-hasta cuando aparecen en pantalla
   --------------------------------------------------------------------- */
function animarCifras() {
    const cifras = document.querySelectorAll("[data-hasta]");
    if (cifras.length === 0) {
        return;
    }

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) {
                return;
            }

            const elemento = entrada.target;
            const final = Number(elemento.dataset.hasta);
            const sufijo = elemento.dataset.sufijo || "";
            const paso = Math.max(1, Math.ceil(final / 50));
            let actual = 0;

            const intervalo = setInterval(() => {
                actual += paso;
                if (actual >= final) {
                    actual = final;
                    clearInterval(intervalo);
                }
                elemento.textContent = actual.toLocaleString("es-CO") + sufijo;
            }, 25);

            observador.unobserve(elemento); // solo se anima una vez
        });
    }, { threshold: 0.5 });

    cifras.forEach((cifra) => observador.observe(cifra));
}


/* ---------------------------------------------------------------------
   6. DETALLES DE LA INTERFAZ
   --------------------------------------------------------------------- */
function iniciarInterfaz() {
    const anio = document.getElementById("anio");
    if (anio) {
        anio.textContent = new Date().getFullYear();
    }

    const menu = document.querySelector(".navbar-taco");
    const botonArriba = document.getElementById("btnArriba");

    window.addEventListener("scroll", () => {
        if (menu) {
            menu.classList.toggle("con-sombra", window.scrollY > 20);
        }
        if (botonArriba) {
            botonArriba.classList.toggle("visible", window.scrollY > 400);
        }
    });

    if (botonArriba) {
        botonArriba.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}


/* ---------------------------------------------------------------------
   INICIO: se ejecuta en todas las páginas
   --------------------------------------------------------------------- */
renderizarPlatos();
activarFiltrosMenu();
mostrarEstadoLocal();
animarCifras();
iniciarInterfaz();
