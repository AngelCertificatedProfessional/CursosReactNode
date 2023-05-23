import { doc,collection, setDoc} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './journalSlice';
export const startNewNote = () => {
    return async(dispatch,getState) => {
        dispatch(savingNewNote())
        const {uid} = getState().auth;
        const newNote = {
            title:'',
            body:'',
            date:new Date().getTime()
        }
        //Proceso para guardar en la bd
        const newDoc = doc(collection(FirebaseDB,`${uid}/journal/notes`))
        await setDoc(newDoc,newNote);
        newNote.id = newDoc.id
        //! dispatch
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
        //dispatch(activarNote)
    } 
}

export const startLoadingNotes = (uid = '') => {
    return async(dispatch,getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('El UID del usuario no existe')
        
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))

    }
}