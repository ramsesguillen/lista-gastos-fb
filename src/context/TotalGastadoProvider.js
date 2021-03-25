import React, { useEffect, useState } from 'react'
import { useGetGastoDelMes } from '../hooks/useGetGastoDelMes'
import { TotatalGastadoMesContext } from './TotatalGastadoMesContext'

export const TotalGastadoProvider = ({ children }) => {

    const [total, setTotal] = useState(0)
    const [ gastos ] = useGetGastoDelMes();

    useEffect(() => {
        let acomulado = 0;
        gastos.forEach( gasto => {
            acomulado += Number(gasto.cantidad);
        });
        setTotal( acomulado );
    }, [ gastos ])


    return (
        <TotatalGastadoMesContext.Provider
            value={{
                total
            }}
        >
            { children }
        </TotatalGastadoMesContext.Provider>
    )
}
