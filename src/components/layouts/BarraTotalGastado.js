import React, { useContext } from 'react'
import styled from 'styled-components';
import { TotatalGastadoMesContext } from '../../context/TotatalGastadoMesContext';
import { formatearCantidad } from '../../helpers/convertirAMoneda';
import theme from '../../theme/theme';



export const BarraTotalGastado = () => {

    const { total } = useContext(TotatalGastadoMesContext);


    return (
        <BarraTotal>
            <p>Total Gastado en el mes:</p>
            <p>{ formatearCantidad( total )}</p>
        </BarraTotal>
    )
}

const BarraTotal = styled.div`
    /* height: 100%; */
    background: ${theme.verde};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;