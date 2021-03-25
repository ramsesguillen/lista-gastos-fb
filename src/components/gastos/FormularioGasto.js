import React, { useContext, useEffect, useState } from 'react'
import { Boton } from '../layouts/Boton'
import { ContenedorBoton, ContenedorFiltros, Formulario, Input, InputGrande } from '../layouts/Inputs'
import { ReactComponent as IconoPlus } from '../../assets/img/plus.svg'
import { SelectCategorias } from '../layouts/SelectCategorias'
import { DatePcker } from '../layouts/DatePcker'

import getUnixTime from 'date-fns/getUnixTime'
import { agregarGasto } from '../../firebase/agregarGasto'
import { AuthContext } from '../../context/AuthContext'
import { Alerta } from '../layouts/Alerta'
import { fromUnixTime } from 'date-fns'
import { useHistory } from 'react-router-dom'
import { editarGasto } from '../../firebase/editarGasto'


export const FormularioGasto = ({ gasto }) => {

    const history = useHistory();

    const { usuario } = useContext( AuthContext );

    const [values, setValues] = useState({
        valor: '',
        descripcion: '',
    });

    const [categoria, setCategoria] = useState('hogar');
    const [fecha, setFecha] = useState( new Date() );
    const [alerta, setAlerta] = useState({});
    const [estadoAlerta, setEstadoAlerta] = useState(false);

    useEffect(() => {
        if ( gasto ) {
            if ( gasto.data().uidUsuario === usuario.uid ) {
                setCategoria( gasto.data().categoria  );
                setFecha( fromUnixTime( gasto.data().fecha ));
                setValues({ valor: gasto.data().cantidad, descripcion: gasto.data().descripcion })
            } else {
                history.push('/lista');
            }
        }
    }, [ gasto, usuario, history])

    const { valor, descripcion } = values;

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    };


    const handleSubmit = e => {
        e.preventDefault();
        const cantidad = parseFloat( valor ).toFixed(2);

        if ( categoria.trim() === '' || descripcion.trim() === '' || valor.trim() === '' || fecha === '' ) {
            setEstadoAlerta( true );
            setAlerta({ tipo: 'error', mensaje: 'Todos los campos son obligatorios'});
            return;
        }
        if ( !cantidad ) {
            setEstadoAlerta( true );
            setAlerta({ tipo: 'error', mensaje: 'Ingresa una cantidad valida'});
            return;
        }

        const objGasto = {
            categoria,
            descripcion,
            cantidad,
            fecha: getUnixTime( fecha ),
            uidUsuario: usuario.uid
        };

        if ( gasto ) {
            editarGasto({...objGasto, id: gasto.id})
                .then(() => history.push('/lista') )
                .catch(console.log);
        }

        agregarGasto(objGasto).then( () => {
            setValues({ valor: '', descripcion: ''});
            setCategoria('hogar');
            setFecha( new Date());
            setEstadoAlerta( true );
            setAlerta({ tipo: 'exito', mensaje: 'Gasto agregado correctamente'});
        }).catch(console.log);
    }

    return (
        <Formulario onSubmit={ handleSubmit }>
            <ContenedorFiltros>
                <SelectCategorias
                    categoria={ categoria }
                    setCategoria={ setCategoria }
                />
                <DatePcker
                    fecha={ fecha }
                    setFecha={ setFecha }
                />
            </ContenedorFiltros>
            <div>
                <Input
                    type="text"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Description"
                    autoComplete="off"
                    value={ descripcion }
                    onChange={ handleInputChange }
                />
                <InputGrande
                    type="number"
                    name="valor"
                    id="valor"
                    placeholder="$0.00"
                    autoComplete="off"
                    value={ valor }
                    onChange={ handleInputChange }
                />
            </div>
            <ContenedorBoton>
                <Boton
                    as="button"
                    primario
                    conIcono
                    type="submit"
                >
                    { ( gasto ) ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus />
                </Boton>
            </ContenedorBoton>
        <Alerta
                tipo={ alerta.tipo }
                mensaje={ alerta.mensaje }
                estadoAlerta={ estadoAlerta }
                setEstadoAlerta={ setEstadoAlerta }
        />
        </Formulario>
    )
}
