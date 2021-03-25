import React from 'react'
import { ContenedorHeader, Header, Titulo } from '../layouts/Header'
import {Helmet} from "react-helmet";
import { BtnRegresar } from '../layouts/BtnRegresar';
import { BarraTotalGastado } from '../layouts/BarraTotalGastado';
import { useGetGastosMesCategoria } from '../../hooks/useGetGastosMesCategoria';
import { ElementoListaCategorias, ListaDeCategorias, Valor, Categoria as CategoriaC } from '../layouts/ElementosLista';
import { IconoCategoria } from '../layouts/IconoCategoria';
import { formatearCantidad } from '../../helpers/convertirAMoneda';

export const Categoria = () => {

    const gastos = useGetGastosMesCategoria();

    return (
        <>
            <Helmet>
                <title>| Gastos por Categoria |</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <BtnRegresar />
                    <Titulo>Gastos por Categorias</Titulo>
                </ContenedorHeader>
            </Header>

            <ListaDeCategorias>
                {
                    gastos.map(( elemento, index) => (
                        <ElementoListaCategorias key={index}>
                            <CategoriaC><IconoCategoria nombre={ elemento.categoria} />{ elemento.categoria }</CategoriaC>
                            <Valor>{ formatearCantidad( elemento.cantidad )}</Valor>
                        </ElementoListaCategorias>
                    ))
                }
            </ListaDeCategorias>
            <BarraTotalGastado />
        </>
    )
}
