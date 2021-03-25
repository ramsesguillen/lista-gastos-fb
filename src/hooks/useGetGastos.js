import { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig';

export const useGetGastos = ( idUsuario ) => {
    const [gastos, setGastos] = useState([]);
    const [ultimo, setUltimo] = useState(null);
    const [masElementos, setMasElementos] = useState(false);


    const obtenerMasGastos = () => {
        db.collection('gastos')
        .where('uidUsuario', '==', idUsuario )
        .orderBy('fecha', 'desc')
        .limit(10)
        .startAfter( ultimo )
        .onSnapshot((snapshot) => {
            if ( snapshot.docs.length > 0 ) {
                setUltimo( snapshot.docs[ snapshot.docs.length - 1 ] );
                setGastos( gastos.concat(snapshot.docs.map( gasto =>({ ...gasto.data(), id: gasto.id })) ))
                setMasElementos( true );
            } else {
                setMasElementos( false );
            }
        })
    }


    useEffect(() => {
        const unsuscribe = db.collection('gastos')
        .where('uidUsuario', '==', idUsuario )
        .orderBy('fecha', 'desc')
        .limit(10)
        .onSnapshot((snapshot) => {
            if ( snapshot.docs.length > 0 ) {
                setUltimo( snapshot.docs[ snapshot.docs.length - 1 ] );
                setMasElementos( true );
            } else {
                setMasElementos( false );
            }
            setGastos( snapshot.docs.map( gasto =>({ ...gasto.data(), id: gasto.id })))
        })

        return unsuscribe;
    }, [ idUsuario ])

    return [ gastos, obtenerMasGastos, masElementos ];
}
