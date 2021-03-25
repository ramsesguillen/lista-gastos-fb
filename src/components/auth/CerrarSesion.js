import React from 'react'
import { useHistory } from 'react-router-dom'
import { ReactComponent as IconoCerrarSesion } from '../../assets/img/log-out.svg'
import { auth } from '../../firebase/firebaseConfig'
import { Boton } from '../layouts/Boton'

export const CerrarSesion = () => {

    const history = useHistory();

    const handleClick = async () => {
        try {
            await auth.signOut();
            history.push('/auth/login');
        } catch (error) {
            console.log( error );
        }
    }

    return (
        <Boton
            iconoGrande
            as="button"
            onClick={ handleClick }
        >
            <IconoCerrarSesion />
        </Boton>
    )
}
