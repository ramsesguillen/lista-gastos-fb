import { db } from './firebaseConfig'

export const editarGasto = ( {id, categoria, descripcion, cantidad, fecha } ) => {
    return db.collection('gastos').doc(id).update({
        categoria, descripcion, fecha, cantidad
    });
}

