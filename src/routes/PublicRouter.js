import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

export const PublicRouter = ({
    component: Component,
    ...rest
}) => {

    const {usuario} = useContext(AuthContext);

    return (
        <Route { ...rest }
            component={ props => (
                ( !usuario )
                    ? <Component { ...props } />
                    : <Redirect to="/" />
            )}
        />
    )
}
