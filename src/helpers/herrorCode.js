
export const herrorCode = error => {
    switch(error){
        case 'auth/invalid-password':
            return'La contraseña tiene que ser de al menos 6 caracteres.'
        case 'auth/email-already-in-use':
            return 'Ya existe una cuenta con el correo electrónico proporcionado.'
        case 'auth/invalid-email':
            return 'El correo electrónico no es válido.'
        case '"auth/user-not-found"':
            return 'No se encontro ninguna cuenta con este correo electrónico'
        case 'auth/wrong-password':
            return 'La contraseña no es correcta'
        default:
            return 'Hubo un error al intentar crear la cuenta.'
    }
}
