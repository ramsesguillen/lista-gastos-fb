import React from 'react'
import { Contenedor } from './components/layouts/Contenedor'
import { AppRouter } from './routes/AppRouter'
import {Helmet} from "react-helmet";
import img from './assets/img/logo.png';
import { Fondo } from './components/layouts/Fondo';
import { AuthProvider } from './context/AuthProvider';
import { TotalGastadoProvider } from './context/TotalGastadoProvider';

export const App = () => {
    return (
        <>
            <Helmet>
                <link rel="shortcut icon" href={ img } type="image/x-icon" />
                <title>| MIS GASTOS |</title>
            </Helmet>

            <AuthProvider>
                <TotalGastadoProvider>
                    <Contenedor>
                        <AppRouter />
                    </Contenedor>
                </TotalGastadoProvider>
            </AuthProvider>

            <Fondo />
        </>
    )
}
