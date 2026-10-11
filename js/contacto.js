/* =====================================================================
   EL COMAL - contacto.js
   ---------------------------------------------------------------------
   Formulario de contacto con validación en tiempo real.
   Usa activarValidacion() de validacion.js.
   Incluye un contador de caracteres para el mensaje.
   ===================================================================== */

"use strict";

const formContacto = document.getElementById("formContacto");

if (formContacto) {
    const campoMensaje = document.getElementById("mensaje");
    const contador = document.getElementById("contadorMensaje");
    const LIMITE = 400;

    const reglas = {
        nombre(valor) {
            if (valor === "") return "Escribe tu nombre.";
            if (valor.length < 3) return "El nombre debe tener al menos 3 letras.";
            if (!patrones.nombre.test(valor)) return "Usa solo letras y espacios.";
            return "";
        },
        correo(valor) {
            if (valor === "") return "Escribe tu correo.";
            if (!patrones.correo.test(valor)) return "Correo no válido. Ejemplo: nombre@correo.com";
            return "";
        },
        asunto(valor) {
            return valor === "" ? "Elige un asunto." : "";
        },
        mensaje(valor) {
            if (valor === "") return "Escribe tu mensaje.";
            if (valor.length < 15) return `Faltan ${15 - valor.length} caracteres (mínimo 15).`;
            if (valor.length > LIMITE) return `Máximo ${LIMITE} caracteres.`;
            return "";
        },
        acepto(marcado) {
            return marcado ? "" : "Debes aceptar el tratamiento de datos.";
        }
    };

    function actualizarContador() {
        const largo = campoMensaje.value.length;
        contador.textContent = `${largo} / ${LIMITE}`;
        contador.classList.toggle("limite", largo > LIMITE - 40);
    }

    activarValidacion(formContacto, reglas, () => {
        const nombre = document.getElementById("nombre").value.trim().split(" ")[0];
        const alerta = formContacto.querySelector(".alerta-formulario");
        alerta.className = "alerta-formulario alert alert-success fw-semibold";
        alerta.textContent = `¡Gracias, ${nombre}! 🌮 Te responderemos muy pronto.`;
        // reset() se ejecuta después; el contador se actualiza a 0 en el siguiente ciclo
        setTimeout(actualizarContador, 0);
    });

    campoMensaje.addEventListener("input", actualizarContador);
    actualizarContador();
}
