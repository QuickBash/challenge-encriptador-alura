const contenedorSalida = document.getElementById("contenedor-salida");
const mensajeAlertaVacio = document.getElementById("mensaje-alerta-salida");
const textAreaEntrada = document.getElementById("textarea-entrada");
const textAreaSalida = document.getElementById("textarea-salida");
const btnCopiar = document.getElementById("btn-copiar");
const btnEncriptar = document.getElementById("btn-encriptar");
const btnDesencriptar = document.getElementById("btn-desencriptar");

const matrizEncriptacion = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

//Laves de encriptacion
// `La letra "e" es convertida para "enter"`
// `La letra "i" es convertida para "imes"`
// `La letra "a" es convertida para "ai"`
// `La letra "o" es convertida para "ober"`
// `La letra "u" es convertida para "ufat"`

const verificarMediaQueryLimite = () => {
    const mediaQueryLimite = window.matchMedia("(min-width: 1440px)");
    return mediaQueryLimite.matches;
};

const alternarClaseCSS = (elemento, claseCSS) => {
    elemento.classList.toggle(claseCSS)
}

const manejarAlertaDeSalidaVacia = () => {
    if (textAreaSalida.value === ""){
        alternarClaseCSS(contenedorSalida, "contenedor-salida_ocultar");
        alternarClaseCSS(mensajeAlertaVacio, "mensaje-alerta-salida_ocultar")
    }
}

const manejarAlturaTextArea = (textArea) => {
    textArea.style.height =
        !verificarMediaQueryLimite() && textArea.value !== "" ? textArea.scrollHeight + "px" : "";
};

const ajustarAlturaTextAreas = () => {
    manejarAlturaTextArea(textAreaEntrada);
    manejarAlturaTextArea(textAreaSalida);
};

const validarTexto = () => {
    const textoEscrito = textAreaEntrada.value;
    const regex = /^[a-z\s\n]*$/;
    if (!regex.test(textoEscrito)) {
        alert("Solo son permitidas letras minúsculas y sin acentos");
        textAreaEntrada.value = "";
        return false;
    }
    return true;
};

const encriptar = (stringEscrita) => {
    for (const [original, encriptado] of matrizEncriptacion) {
        if (stringEscrita.includes(original)) {
            stringEscrita = stringEscrita.replace(new RegExp(original, "g"), encriptado);
        }
    }
    return stringEscrita;
};

const desencriptar = (stringEscrita) => {
    for (const [original, encriptado] of matrizEncriptacion) {
        if (stringEscrita.includes(encriptado)) {
            stringEscrita = stringEscrita.replace(new RegExp(encriptado, "g"), original);
        }
    }
    return stringEscrita;
};

const copiarTexto = () => {
    textAreaSalida.select();
    navigator.clipboard.writeText(textAreaSalida.value);
    textAreaSalida.value = "";
    alert("Texto Copiado");
};

// Agregar un listener para el evento onresize de la ventana
window.addEventListener("resize", () => ajustarAlturaTextAreas());

textAreaEntrada.addEventListener("input", (e) => manejarAlturaTextArea(e.target));

btnCopiar.addEventListener("click", () => {
    copiarTexto();
    ajustarAlturaTextAreas();
    manejarAlertaDeSalidaVacia()
});

btnEncriptar.addEventListener("click", () => {
    if (validarTexto() && textAreaEntrada.value !== "") {
        manejarAlertaDeSalidaVacia()
        const textoEncriptado = encriptar(textAreaEntrada.value);
        textAreaSalida.value = textoEncriptado;
        textAreaEntrada.value = "";
    }
    ajustarAlturaTextAreas();
});

btnDesencriptar.addEventListener("click", () => {
    if (validarTexto() && textAreaEntrada.value !== "") {
        manejarAlertaDeSalidaVacia()
        const textoEncriptado = desencriptar(textAreaEntrada.value);
        textAreaSalida.value = textoEncriptado;
        textAreaEntrada.value = "";
    }
    ajustarAlturaTextAreas();
});