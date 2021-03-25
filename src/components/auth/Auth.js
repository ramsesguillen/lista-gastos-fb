import React, { useState } from 'react'
import {Helmet} from "react-helmet";
import { Boton } from '../layouts/Boton';
import { ContenedorHeader, Header, Titulo } from '../layouts/Header';
import { ContenedorBoton, Formulario, Input } from '../layouts/Inputs';
import { ReactComponent as SvgLogin } from '../../assets/img/login.svg';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Alerta } from '../layouts/Alerta';
import { auth } from '../../firebase/firebaseConfig';
import { herrorCode } from '../../helpers/herrorCode';

const Svg = styled( SvgLogin )`
    width: 100%;
    max-height: 12.5rem;
    margin-bottom: 1.25rem;
`;

export const Auth = () => {

    const history = useHistory();

    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});


    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const { email, password } = values;

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };


    const handleSubmit = async e => {
        e.preventDefault();
        setEstadoAlerta( false );
        setAlerta({});
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( !regex.test( email )) {
            setEstadoAlerta( true );
            setAlerta({ tipo: 'error', mensaje: 'Correo no valido'});
            return;
        }
        if ( email.trim() === '' || password.trim() === '' ){
            setEstadoAlerta( true );
            setAlerta({ tipo: 'error', mensaje: 'Todos los campos son obligatorios'});
            return;
        }

        try {
            await auth.signInWithEmailAndPassword( email, password );
            history.push('/home');
        } catch (error) {
            const mensaje = herrorCode( error.code)
            setAlerta({ tipo: 'error', mensaje });
            setEstadoAlerta( true );
        }
    }


    return (
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <div>
                        <Boton to="/auth/register">Crear Cuenta</Boton>
                    </div>
                </ContenedorHeader>
            </Header>

            <Formulario
                onSubmit={ handleSubmit }
            >
                <Svg />
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo Electronico"
                    value={ email }
                    onChange={ handleInputChange }
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={ password }
                    onChange={ handleInputChange }
                />
                <ContenedorBoton>
                    <Boton as="button" primario types="submit">Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta
                tipo={ alerta.tipo }
                mensaje={ alerta.mensaje }
                estadoAlerta={ estadoAlerta }
                setEstadoAlerta={ setEstadoAlerta }
            />
        </>
    )
}