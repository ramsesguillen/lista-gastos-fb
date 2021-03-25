import React from 'react'
import {Helmet} from "react-helmet";
import { CerrarSesion } from './auth/CerrarSesion';
import { FormularioGasto } from './gastos/FormularioGasto';
import { BarraTotalGastado } from './layouts/BarraTotalGastado';
import { Boton } from './layouts/Boton';
import { ContenedorBotones, ContenedorHeader, Header, Titulo } from './layouts/Header'

export const HomeScreem = () => {
    return (
        <>
            <Helmet>
                <title>| Agregar Gasto |</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Agregar Gasto</Titulo>
                    <ContenedorBotones>
                        <Boton to="/categorias">Categorias</Boton>
                        <Boton to="/lista">Lista de Gastos</Boton>
                        <CerrarSesion />
                    </ContenedorBotones>
                </ContenedorHeader>
            </Header>
            <FormularioGasto />
            <BarraTotalGastado />
        </>
    )
}

