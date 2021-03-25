import { db } from "./firebaseConfig"


export const borrarGasto = id => {
    db.collection('gastos').doc(id).delete();
}
