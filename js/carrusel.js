/* =====================================================================
   EL COMAL - carrusel.js
   ---------------------------------------------------------------------
   Carrusel de imágenes de la página de inicio, hecho con JavaScript.

   Funciones:
     - Avanza solo cada 5 segundos
     - Botones anterior / siguiente y puntos indicadores
     - Se pausa al pasar el mouse o al enfocarlo con el teclado
     - Flechas del teclado y deslizar con el dedo en celulares

   Usa una CLAUSURA: crearCarrusel() guarda el índice actual en una
   variable privada que solo pueden cambiar sus funciones internas.
   ===================================================================== */

"use strict";

function crearCarrusel(elemento, opciones = {}) {
    const pista = elemento.querySelector(".carrusel-pista");
    const diapositivas = elemento.querySelectorAll(".carrusel-slide");
    const botonAnterior = elemento.querySelector(".carrusel-control.anterior");
    const botonSiguiente = elemento.querySelector(".carrusel-control.siguiente");
    const contenedorPuntos = elemento.querySelector(".carrusel-indicadores");
    const intervalo = opciones.intervalo || 5000;

    // Si la persona prefiere menos movimiento, no se mueve solo
    const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let indice = 0;            // variable privada (clausura)
    let temporizador = null;
    let inicioToque = 0;

    // Crear un punto indicador por cada diapositiva
    const puntos = [];
    diapositivas.forEach((diapositiva, i) => {
        const punto = document.createElement("button");
        punto.type = "button";
        punto.className = "carrusel-punto";
        punto.setAttribute("aria-label", `Ir a la diapositiva ${i + 1}`);
        punto.addEventListener("click", () => {
            irA(i);
            reiniciar();
        });
        contenedorPuntos.appendChild(punto);
        puntos.push(punto);
    });

    // Mueve la pista a la diapositiva indicada
    function irA(nuevoIndice) {
        if (nuevoIndice < 0) {
            indice = diapositivas.length - 1;   // del primero salta al último
        } else if (nuevoIndice >= diapositivas.length) {
            indice = 0;                         // del último vuelve al primero
        } else {
            indice = nuevoIndice;
        }

        pista.style.transform = `translateX(-${indice * 100}%)`;

        diapositivas.forEach((diapositiva, i) => {
            const activa = i === indice;
            diapositiva.setAttribute("aria-hidden", String(!activa));
            diapositiva.inert = !activa; // evita llegar con Tab a enlaces ocultos
        });

        puntos.forEach((punto, i) => {
            punto.classList.toggle("activo", i === indice);
            punto.setAttribute("aria-current", i === indice ? "true" : "false");
        });
    }

    const siguiente = () => irA(indice + 1);
    const anterior = () => irA(indice - 1);

    function detener() {
        clearInterval(temporizador);
    }

    function iniciar() {
        detener();
        if (!menosMovimiento) {
            temporizador = setInterval(siguiente, intervalo);
        }
    }

    function reiniciar() {
        iniciar();
    }

    // Botones
    botonSiguiente.addEventListener("click", () => {
        siguiente();
        reiniciar();
    });
    botonAnterior.addEventListener("click", () => {
        anterior();
        reiniciar();
    });

    // Pausa con el mouse o con el foco del teclado
    elemento.addEventListener("mouseenter", detener);
    elemento.addEventListener("mouseleave", iniciar);
    elemento.addEventListener("focusin", detener);
    elemento.addEventListener("focusout", iniciar);

    // Flechas del teclado
    elemento.addEventListener("keydown", (evento) => {
        if (evento.key === "ArrowRight") {
            siguiente();
        } else if (evento.key === "ArrowLeft") {
            anterior();
        }
    });

    // Deslizar con el dedo (celulares y tablets)
    elemento.addEventListener("touchstart", (evento) => {
        inicioToque = evento.touches[0].clientX;
        detener();
    }, { passive: true });

    elemento.addEventListener("touchend", (evento) => {
        const distancia = evento.changedTouches[0].clientX - inicioToque;
        if (distancia < -50) {
            siguiente();
        } else if (distancia > 50) {
            anterior();
        }
        iniciar();
    });

    // Estado inicial
    irA(0);
    iniciar();

    // Solo se expone lo necesario; "indice" queda privado
    return { siguiente, anterior, irA };
}

const carruselInicio = document.getElementById("carrusel");
if (carruselInicio) {
    crearCarrusel(carruselInicio, { intervalo: 5000 });
}
