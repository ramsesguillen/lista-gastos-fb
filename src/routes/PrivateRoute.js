import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => {

    const {usuario} = useContext(AuthContext);

    return (
        <Route { ...rest }
            component={ props => (
                ( usuario )
                    ? <Component { ...props } />
                    : <Redirect to="/auth/login" />
            )}
        />
    )
}
