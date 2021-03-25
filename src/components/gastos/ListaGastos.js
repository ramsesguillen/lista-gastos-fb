import React, { useContext } from 'react'
import { ContenedorHeader, Header, Titulo } from '../layouts/Header'
import {Helmet} from "react-helmet";
import { BtnRegresar } from '../layouts/BtnRegresar';
import { AuthContext } from '../../context/AuthContext';
import { BarraTotalGastado } from '../layouts/BarraTotalGastado';
import { useGetGastos } from '../../hooks/useGetGastos';
import { BotonAccion, BotonCargarMas, Categoria, ContenedorBotonCentral, ContenedorBotones, ContenedorSubtitulo, Descripcion, ElementoLista, Fecha, Lista, Subtitulo, Valor } from '../layouts/ElementosLista';
import { IconoCategoria } from '../layouts/IconoCategoria';
import { formatearCantidad } from '../../helpers/convertirAMoneda';
import { ReactComponent as IconoEditar } from '../../assets/img/editar.svg';
import { ReactComponent as IconoBorrar } from '../../assets/img/borrar.svg';
import { Link } from 'react-router-dom';
import { Boton } from '../layouts/Boton';
import {format, fromUnixTime} from 'date-fns'
import { es } from 'date-fns/locale'
import { borrarGasto } from '../../firebase/borrarGasto';

export const ListaGastos = () => {

    const {usuario } = useContext( AuthContext);
    const [ gastos, obtenerMasGastos, masElementos ] = useGetGastos( usuario.uid );

    const formatearFecha = fecha => {
        return format( fromUnixTime( fecha ), "dd 'de' MMMM 'de' yyyy", { locale: es });
    }

    const FechaEsIgual = ( gastos, index, gasto ) => {
        if ( index !== 0 ) {
            const fechaActual = formatearFecha( gasto.fecha );
            const fechaAnterior = formatearFecha( gastos[index - 1].fecha);
            if ( fechaActual === fechaAnterior ) {
                return true;
            }

            return false;
        }
    }

    return (
        <>
            <Helmet>
                <title>| Lista de Gastos |</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <BtnRegresar />
                    <Titulo>Lista de Gastos</Titulo>
                </ContenedorHeader>
            </Header>
            <Lista>
                {
                    gastos.map( (gasto, i) => (
                        <div key={ gasto.id }>
                        {
                            ( !FechaEsIgual( gastos, i, gasto)) && <Fecha>{ formatearFecha(gasto.fecha) }</Fecha>
                        }
                            <ElementoLista>
                                <Categoria>
                                    <IconoCategoria nombre={ gasto.categoria }/>
                                    { gasto.categoria }
                                </Categoria>
                                <Descripcion>
                                    { gasto.descripcion }
                                </Descripcion>
                                <Valor>{ formatearCantidad(gasto.cantidad )}</Valor>
                                <ContenedorBotones>
                                    <BotonAccion as={ Link } to={`/editar/${gasto.id}`}><IconoEditar/></BotonAccion>
                                    <BotonAccion onClick={() => borrarGasto( gasto.id )}><IconoBorrar/></BotonAccion>
                                </ContenedorBotones>
                            </ElementoLista>
                        </div>
                    ))
                }
                {
                    ( masElementos )&&
                        <ContenedorBotonCentral>
                            <BotonCargarMas onClick={ () => obtenerMasGastos() }>Cargar Más</BotonCargarMas>
                        </ContenedorBotonCentral>
                }
                {
                    (gastos.length === 0) &&
                        <ContenedorSubtitulo>
                            <Subtitulo>No hay gastos por mostrar</Subtitulo>
                            <Boton as={ Link } to="/home">Agregar Gasto</Boton>
                        </ContenedorSubtitulo>
                }
            </Lista>
            <BarraTotalGastado />
        </>
    )
}
