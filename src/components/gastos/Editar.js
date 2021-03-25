import React from 'react'
import { ContenedorHeader, Header, Titulo } from '../layouts/Header'
import {Helmet} from "react-helmet";
import { BtnRegresar } from '../layouts/BtnRegresar';
import { BarraTotalGastado } from '../layouts/BarraTotalGastado';
import { FormularioGasto } from './FormularioGasto';
import { useParams } from 'react-router-dom';
import { useGetGasto } from '../../hooks/useGetGasto';

export const Editar = () => {

    const { id } = useParams();
    const [ gasto ] = useGetGasto(id);

    return (
        <>
            <Helmet>
                <title>| Editar Gasto |</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <BtnRegresar ruta="/lista"/>
                    <Titulo>Editar Gastos</Titulo>
                </ContenedorHeader>
            </Header>
            <FormularioGasto gasto={ gasto }/>
            <BarraTotalGastado />
        </>
    )
}
