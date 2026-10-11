/* =====================================================================
   EL COMAL - galeria.js
   ---------------------------------------------------------------------
   Galería de fotos: al hacer clic en una imagen se abre en grande
   dentro de una ventana (modal de Bootstrap). Se puede pasar a la
   siguiente o a la anterior con los botones o con las flechas del
   teclado.
   ===================================================================== */

"use strict";

const itemsGaleria = document.querySelectorAll(".galeria-item");

if (itemsGaleria.length > 0) {
    const modalGaleria = document.getElementById("modalGaleria");
    const imagenGrande = document.getElementById("visorImagen");
    const tituloVisor = document.getElementById("visorTitulo");
    const contadorVisor = document.getElementById("visorContador");
    const ventana = bootstrap.Modal.getOrCreateInstance(modalGaleria);

    // Se arma un arreglo de objetos con los datos de cada foto
    const fotos = Array.from(itemsGaleria).map((item) => {
        const imagen = item.querySelector("img");
        return {
            src: imagen.getAttribute("src"),
            alt: imagen.getAttribute("alt"),
            titulo: item.querySelector("figcaption").textContent
        };
    });

    let actual = 0;

    function mostrarFoto(indice) {
        // Da la vuelta al llegar al principio o al final
        if (indice < 0) {
            actual = fotos.length - 1;
        } else if (indice >= fotos.length) {
            actual = 0;
        } else {
            actual = indice;
        }

        const foto = fotos[actual];
        imagenGrande.src = foto.src;
        imagenGrande.alt = foto.alt;
        tituloVisor.textContent = foto.titulo;
        contadorVisor.textContent = `${actual + 1} / ${fotos.length}`;
    }

    itemsGaleria.forEach((item, indice) => {
        item.addEventListener("click", () => {
            mostrarFoto(indice);
            ventana.show();
        });
    });

    document.getElementById("visorAnterior").addEventListener("click", () => mostrarFoto(actual - 1));
    document.getElementById("visorSiguiente").addEventListener("click", () => mostrarFoto(actual + 1));

    // Flechas del teclado solo cuando la ventana está abierta
    modalGaleria.addEventListener("keydown", (evento) => {
        if (evento.key === "ArrowRight") {
            mostrarFoto(actual + 1);
        } else if (evento.key === "ArrowLeft") {
            mostrarFoto(actual - 1);
        }
    });
}
