import React, { useState } from 'react'
import {Helmet} from "react-helmet";
import { Boton } from '../layouts/Boton';
import { ContenedorHeader, Header, Titulo } from '../layouts/Header';
import { ContenedorBoton, Formulario, Input } from '../layouts/Inputs';
import { ReactComponent as SvgLogin } from '../../assets/img/registro.svg';
import styled from 'styled-components';
import { auth } from '../../firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { herrorCode } from '../../helpers/herrorCode';
import { Alerta } from '../layouts/Alerta';

const Svg = styled( SvgLogin )`
    width: 100%;
    max-height: 6.25rem;
    margin-bottom: 1.25rem;
`;

export const RegistroUsuario = () => {

    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});

    const history = useHistory();

    const [values, setValues] = useState({
        email: '',
        password: '',
        password2: ''
    });
    const { email, password, password2 } = values;
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
            // todo: correo no valido
            setEstadoAlerta( true );
            setAlerta({ tipo: 'error', mensaje: 'Correo no valido'});
            return;
        }
        if ( email.trim() === '' || password.trim() === '' || password2.trim() === '' ){
            // Todo: todos los campos son obli
            setEstadoAlerta( true );
            setAlerta({ tipo: 'error', mensaje: 'Todos los campos son obligatorios'});
            return;
        }
        if ( password !== password2 ) {
            // todo: 
            setAlerta({ tipo: 'error', mensaje: 'Las contraseñas no coinciden'});
            setEstadoAlerta( true );
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            history.push('/');
            // setAlerta({ tipo: 'exito', mensaje: 'Bien hecho!!'});
            // setEstadoAlerta( true );
        } catch (error) {
            const mensaje = herrorCode( error.code)
            setAlerta({ tipo: 'error', mensaje: mensaje });
            setEstadoAlerta( true );
        }
    }
    return (
        <>
            <Helmet>
                <title>Crear Cuenta</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to="/auth/login">Iniciar Sesión</Boton>
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
                <Input
                    type="password"
                    name="password2"
                    placeholder="Confirmar contraseña"
                    value={ password2 }
                    onChange={ handleInputChange }
                />
                <ContenedorBoton>
                    <Boton as="button" primario types="submit">Crear Cuenta</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta
                tipo={ alerta.tipo }
                mensaje={ alerta.mensaje }
                estadoAlerta={ estadoAlerta }
                setEstadoAlerta={setEstadoAlerta}
            />
        </>
    )
}
