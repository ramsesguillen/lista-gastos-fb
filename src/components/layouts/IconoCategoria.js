import React from 'react'

import { ReactComponent as IconoComida } from '../../assets/img/cat_comida.svg';
import { ReactComponent as IconoCompras } from '../../assets/img/cat_compras.svg';
import { ReactComponent as IconoCuentasYPagos } from '../../assets/img/cat_cuentas-y-pagos.svg';
import { ReactComponent as IconoDiversion } from '../../assets/img/cat_diversion.svg';
import { ReactComponent as IconoHogar } from '../../assets/img/cat_hogar.svg';
import { ReactComponent as IconoRopa } from '../../assets/img/cat_ropa.svg';
import { ReactComponent as IconoSaludEHigiene } from '../../assets/img/cat_salud-e-higiene.svg';
import { ReactComponent as IconoTransporte } from '../../assets/img/cat_transporte.svg';

export const IconoCategoria = ({ nombre }) => {
    switch ( nombre ) {
        case 'comida':
            return <IconoComida />
        case 'compras':
            return <IconoCompras />
        case 'cuentas y pagos':
            return <IconoCuentasYPagos />
        case 'diversion':
            return <IconoDiversion />
        case 'hogar':
            return <IconoHogar />
        case 'ropa':
            return <IconoRopa />
        case 'salud e higiene':
            return <IconoSaludEHigiene />
        case 'transporte':
            return <IconoTransporte />
        default:
            return <div></div>;
    }
}
