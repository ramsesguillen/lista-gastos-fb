import React, { useEffect, useState } from 'react'
import { auth } from '../firebase/firebaseConfig';
import { AuthContext } from './AuthContext'

export const AuthProvider = ({children}) => {

    const [usuario, setUsuario] = useState( null );
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const suscripcion = auth.onAuthStateChanged( user => {
            setUsuario( user );
            setCargando(false);
        });
        return suscripcion;
    }, [])

    return (
        <AuthContext.Provider
            value={{
                usuario,
                cargando
            }}
        >
            { !cargando && children }
        </AuthContext.Provider>
    )
}
