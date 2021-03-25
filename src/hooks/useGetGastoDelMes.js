import { useContext, useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig'
import { startOfMonth, endOfMonth, getUnixTime } from 'date-fns';
import { AuthContext } from '../context/AuthContext';

export const useGetGastoDelMes = () => {

    const { usuario } = useContext( AuthContext );

    const [gastos, setGastos] = useState([])

    const inicioMes = getUnixTime( startOfMonth( new Date() ) );
    const finMes = getUnixTime( endOfMonth( new Date() ) );



    useEffect(() => {

        if ( usuario ) {
            const unsuscribe = db.collection('gastos')
                .orderBy('fecha', 'desc')
                .where('fecha', '>=', inicioMes)
                .where('fecha', '<=', finMes)
                .where('uidUsuario', '==', usuario.uid)
                .onSnapshot( snapshot => {
                    setGastos( snapshot.docs.map( document => ({ ...document.data()}) ))
                })
            return unsuscribe;
        }
    }, [usuario, finMes, inicioMes])

    return [ gastos ];
}
