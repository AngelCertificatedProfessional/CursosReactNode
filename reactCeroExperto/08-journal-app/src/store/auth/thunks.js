//normalmente hechos para las tareas asincronas en los redux

import { registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { checkingCredentials,login,logout } from "./"

export const checkingAuthentication = (email,password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const result = await singInWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({name,password,displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials())
        const resp = await registerUserWithEmailPassword({name,password,displayName})
        console.log(resp)
    }
} 