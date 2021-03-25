
import { db } from './firebaseConfig'

export const agregarGasto = ( gasto ) => {
    return db.collection('gastos').add( gasto );

}
