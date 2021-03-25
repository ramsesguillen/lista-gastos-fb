import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { db } from '../firebase/firebaseConfig';

export const useGetGasto = id => {
    const history = useHistory();
    const [gasto, setGasto] = useState(null);

    useEffect(() => {
        db.collection('gastos').doc( id ).get()
            .then((doc) => {
                if ( doc.exists ) {
                    setGasto( doc )
                } else {
                    history.push('/lista');
                }
            })

    }, [history, id])

    return [ gasto ];
}
