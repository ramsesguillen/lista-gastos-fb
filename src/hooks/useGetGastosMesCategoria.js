import React, { useEffect, useState } from 'react'
import { useGetGastoDelMes } from './useGetGastoDelMes'

export const useGetGastosMesCategoria = () => {

    const [gastosCategoria, setGastosCategoria] = useState([]);

    const [ gastos] = useGetGastoDelMes();

    useEffect(() => {
        const sumaGastos = gastos.reduce((objResult, objActual) => {
            const categoriaActual = objActual.categoria;
            const cantidadActual = Number(objActual.cantidad);

            objResult[ categoriaActual ] += cantidadActual;

            return objResult;
        }, {
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0,
        });

        setGastosCategoria( Object.keys( sumaGastos ).map( element => {
            return { categoria: element, cantidad: sumaGastos[element]}
        }) );

    }, [ setGastosCategoria, gastos ])

    return gastosCategoria;






}
