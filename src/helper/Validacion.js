export function validarNumeroTelefono(numeroTelefono) {
    let regex = /^\d+$/;
    return regex.test(numeroTelefono);
}


 export function validarEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

