/* =====================================================================
   EL COMAL - promociones.js
   ---------------------------------------------------------------------
   Cuenta regresiva hasta que termina la promoción de la semana
   (domingo a las 11:59:59 p. m.). Se actualiza cada segundo.
   ===================================================================== */

"use strict";

const cuentaRegresiva = document.getElementById("cuentaRegresiva");

if (cuentaRegresiva) {
    const salidaDias = document.getElementById("crDias");
    const salidaHoras = document.getElementById("crHoras");
    const salidaMinutos = document.getElementById("crMinutos");
    const salidaSegundos = document.getElementById("crSegundos");

    // Calcula el próximo domingo a las 23:59:59
    function finDeSemana() {
        const fin = new Date();
        const diasHastaDomingo = (7 - fin.getDay()) % 7;
        fin.setDate(fin.getDate() + diasHastaDomingo);
        fin.setHours(23, 59, 59, 999);
        return fin;
    }

    const dosDigitos = (numero) => String(numero).padStart(2, "0");

    function actualizar() {
        const restante = finDeSemana() - new Date(); // milisegundos

        const segundosTotales = Math.max(0, Math.floor(restante / 1000));
        const dias = Math.floor(segundosTotales / 86400);
        const horas = Math.floor((segundosTotales % 86400) / 3600);
        const minutos = Math.floor((segundosTotales % 3600) / 60);
        const segundos = segundosTotales % 60;

        salidaDias.textContent = dias;
        salidaHoras.textContent = dosDigitos(horas);
        salidaMinutos.textContent = dosDigitos(minutos);
        salidaSegundos.textContent = dosDigitos(segundos);
    }

    actualizar();
    setInterval(actualizar, 1000);
}
