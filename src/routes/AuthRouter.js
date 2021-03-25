import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Auth } from '../components/auth/Auth'
import { RegistroUsuario } from '../components/auth/RegistroUsuario'
import { AuthContext } from '../context/AuthContext'

export const AuthRouter = () => {

    const { cargando } = useContext( AuthContext);
    if ( cargando ) return null;
    return (
        <div>
            <Switch>
                <Route path="/auth/login" component={ Auth }/>
                <Route exact path="/auth/register" component={ RegistroUsuario }/>
                <Redirect to="/auth/login"/>
            </Switch>
        </div>
    )
}