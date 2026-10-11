/* =====================================================================
   EL COMAL - reservas.js
   ---------------------------------------------------------------------
   Formulario de reservas con validación en tiempo real.
   Usa activarValidacion() de validacion.js y el horario de main.js.

   Reglas especiales:
     - La fecha no puede ser pasada ni a más de 60 días.
     - No se puede reservar un día en que el local está cerrado (lunes).
     - La hora debe ser al menos 1 hora antes del cierre de ese día.
   ===================================================================== */

"use strict";

const formReserva = document.getElementById("formReserva");

if (formReserva) {
    const campoFecha = document.getElementById("fechaReserva");
    const campoHora = document.getElementById("horaReserva");
    const resumen = document.getElementById("resumenReserva");

    // Fecha de hoy en formato AAAA-MM-DD para el atributo "min"
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const aTextoFecha = (fecha) => {
        const mes = String(fecha.getMonth() + 1).padStart(2, "0");
        const dia = String(fecha.getDate()).padStart(2, "0");
        return `${fecha.getFullYear()}-${mes}-${dia}`;
    };
    campoFecha.min = aTextoFecha(hoy);

    // Convierte "2026-10-15" en un objeto Date (sin problemas de zona horaria)
    function leerFecha(texto) {
        const [anio, mes, dia] = texto.split("-").map(Number);
        return new Date(anio, mes - 1, dia);
    }

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
        telefono(valor) {
            if (valor === "") return "Escribe tu teléfono.";
            if (!patrones.telefono.test(valor)) return "Usa solo números (entre 7 y 15 dígitos).";
            return "";
        },
        fecha(valor) {
            if (valor === "") return "Elige una fecha.";
            const fecha = leerFecha(valor);
            const limite = new Date(hoy);
            limite.setDate(limite.getDate() + 60);

            if (fecha < hoy) return "La fecha no puede ser en el pasado.";
            if (fecha > limite) return "Solo aceptamos reservas con 60 días de anticipación.";
            if (horario[fecha.getDay()] === null) return `Los ${nombresDias[fecha.getDay()]} estamos cerrados. Elige otro día.`;
            return "";
        },
        hora(valor) {
            if (valor === "") return "Elige una hora.";
            if (campoFecha.value === "") return "";

            const fecha = leerFecha(campoFecha.value);
            const horas = horario[fecha.getDay()];
            if (horas === null) return "";

            const hora = parseInt(valor, 10);
            if (hora >= horas.cierra - 1) {
                return `Ese día cerramos a las ${horaTexto(horas.cierra)}: elige una hora antes de las ${horaTexto(horas.cierra - 1)}`;
            }
            return "";
        },
        personas(valor) {
            const numero = Number(valor);
            if (valor === "") return "¿Cuántas personas vienen?";
            if (!Number.isInteger(numero) || numero < 1) return "Debe ser al menos 1 persona.";
            if (numero > 12) return "Para más de 12 personas, escríbenos por la página de contacto.";
            return "";
        },
        acepto(marcado) {
            return marcado ? "" : "Debes aceptar las condiciones de la reserva.";
        }
    };

    const validador = activarValidacion(formReserva, reglas, () => {
        // Se muestra el resumen ANTES de que el formulario se limpie
        const datos = new FormData(formReserva);
        const fecha = leerFecha(datos.get("fecha"));
        const fechaTexto = fecha.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });
        const personas = Number(datos.get("personas"));

        resumen.innerHTML = `
            <h3 class="h4 mb-2">¡Mesa reservada! 🎉</h3>
            <p class="mb-1"><strong>A nombre de:</strong> <span data-campo="nombre"></span></p>
            <p class="mb-1"><strong>Fecha:</strong> ${fechaTexto}</p>
            <p class="mb-1"><strong>Hora:</strong> ${horaTexto(parseInt(datos.get("hora"), 10))}</p>
            <p class="mb-0"><strong>Personas:</strong> ${personas} ${personas === 1 ? "persona" : "personas"}</p>`;
        // El nombre lo escribió la persona: se usa textContent por seguridad
        resumen.querySelector("[data-campo='nombre']").textContent = datos.get("nombre");
        resumen.classList.remove("d-none");

        const alerta = formReserva.querySelector(".alerta-formulario");
        alerta.className = "alerta-formulario alert alert-success fw-semibold";
        alerta.textContent = "Te enviamos la confirmación a tu correo (simulado).";
        resumen.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // Si cambia la fecha, la hora se vuelve a revisar (depende del día)
    campoFecha.addEventListener("change", () => {
        if (campoHora.value !== "") {
            validador.validarCampo(campoHora);
        }
    });
}
