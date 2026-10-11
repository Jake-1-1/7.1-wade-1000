/* =====================================================================
   EL COMAL - validacion.js
   ---------------------------------------------------------------------
   Función reutilizable para validar formularios EN TIEMPO REAL.
   La usan reservas.js y contacto.js (buena práctica: no repetir código).

   Cómo funciona:
     - Cada campo se revisa mientras la persona escribe ("input"),
       al cambiar una opción ("change") y al salir del campo ("blur").
     - Se usan las clases de Bootstrap "is-valid" e "is-invalid" para
       pintar el campo de verde o rojo y mostrar el mensaje de ayuda.
     - Al enviar se revisan todos los campos. Si hay errores se enfoca
       el primero; si no, se llama a la función "alEnviar".

   Parámetros:
     formulario  → el elemento <form>
     reglas      → objeto { nombreDelCampo: función(valor) }
                   cada función devuelve "" si está bien, o el mensaje de error
     alEnviar    → función que se ejecuta cuando todo es válido
   ===================================================================== */

"use strict";

// Expresiones regulares compartidas
const patrones = {
    nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    telefono: /^\+?[0-9\s]{7,15}$/
};

function activarValidacion(formulario, reglas, alEnviar) {
    const alerta = formulario.querySelector(".alerta-formulario");
    const campos = Array.from(formulario.querySelectorAll("[name]"))
        .filter((campo) => reglas[campo.name]);

    function valorDe(campo) {
        return campo.type === "checkbox" ? campo.checked : campo.value.trim();
    }

    // Valida un campo, lo pinta y muestra su mensaje. Devuelve true si es válido.
    function validarCampo(campo) {
        const error = reglas[campo.name](valorDe(campo));
        const mensaje = campo.parentElement.querySelector(".invalid-feedback");

        campo.classList.toggle("is-invalid", error !== "");
        campo.classList.toggle("is-valid", error === "");
        if (mensaje) {
            mensaje.textContent = error;
        }
        return error === "";
    }

    function ocultarAlerta() {
        if (alerta) {
            alerta.classList.add("d-none");
        }
    }

    // Retroalimentación en tiempo real
    campos.forEach((campo) => {
        const evento = campo.tagName === "SELECT" || campo.type === "checkbox" || campo.type === "date"
            ? "change"
            : "input";

        campo.addEventListener(evento, () => {
            validarCampo(campo);
            ocultarAlerta();
        });
        campo.addEventListener("blur", () => validarCampo(campo));
    });

    // Envío
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault(); // no recarga la página

        let primerError = null;
        for (const campo of campos) {
            const valido = validarCampo(campo);
            if (!valido && primerError === null) {
                primerError = campo;
            }
        }

        if (primerError) {
            alerta.className = "alerta-formulario alert alert-danger fw-semibold";
            alerta.textContent = "¡Ups! Revisa los campos marcados en rojo.";
            primerError.focus();
            return;
        }

        alEnviar();
        formulario.reset();
        campos.forEach((campo) => campo.classList.remove("is-valid", "is-invalid"));
    });

    // Se devuelve para que otros archivos puedan validar un campo puntual
    return { validarCampo };
}
